import { Context } from "koa";
import { Readable } from "stream";
import csv from "csv-parser";
import { Bank, Transaction, UploadFiles } from "../../types";
import { transactionSanitization } from "../../factory";
import { transactionData } from "../../db";
import { createTransactionDal, updateBalanceDal } from "../../dal";
import { getUserID } from "../../auth/getUserID";

export const uploadHistoryHandler = async (ctx: Context) => {
  console.log(ctx.request.body);
  console.log(ctx.request.files);
  const body = ctx.request.body;
  const files = ctx.request.files as UploadFiles;

  const results: any[] = [];

  let sanitsiedTransactions: Transaction[] = [];

  if (files.transactionRecord && body) {
    console.log("BANK: ", body!.bank);
    console.log("Ingesting file: ", files.transactionRecord[0].originalname);
    const readable = new Readable();
    readable._read = () => {};
    readable.push(files.transactionRecord[0].buffer);
    readable.push(null);
    readable
      .pipe(
        csv({
          separator: ",",
          mapHeaders: ({ header }) => header.toLowerCase(),
        })
      )
      .on("data", (data) => results.push(data));

    const result = "Transaction List ingested";
    ctx.body = { result: result };

    const bank = body.bank as Bank;
    const account = body.account as string;
    const userID = getUserID(ctx);

    sanitsiedTransactions = await transactionSanitization(
      bank,
      account,
      userID,
      results
    );
    sanitsiedTransactions.forEach(async (transaction) => {
      await updateBalanceDal(
        {
          accountName: account,
          bank: bank,
          balanceSince: transaction.date,
          balance: transaction.balance,
        },
        userID
      );
      await createTransactionDal(transaction, userID);
    });
  }
};
