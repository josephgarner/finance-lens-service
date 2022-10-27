import { Context } from "koa";
import { Readable } from "stream";
import csv from "csv-parser";
import { Bank, Transaction, UploadFiles } from "../../types";
import { transactionSanitization } from "../../factory";
import { transactionData } from "../../db";
import { updateBalanceDal } from "../../dal";

export const uploadHistoryHandler = async (ctx: Context) => {
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
    // .on("end", () => {});
    ctx.body = "Transaction List ingested";

    const bank = body.bank as Bank;
    const account = body.account as string;

    sanitsiedTransactions = await transactionSanitization(
      results,
      bank,
      account
    );
    sanitsiedTransactions.forEach(async (transaction) => {
      console.log({
        accountName: account,
        bank: bank,
        balanceSince: transaction.date,
        balance: transaction.balance,
      });
      await updateBalanceDal({
        accountName: account,
        bank: bank,
        balanceSince: transaction.date,
        balance: transaction.balance,
      });
      await transactionData
        .build({
          date: transaction.date,
          type: transaction.type,
          rawDescription: transaction.rawDescription,
          sanitizedDescription: transaction.sanitizedDescription,
          account: transaction.account,
          category: transaction.category,
          vendor: transaction.vendor,
          credit: transaction.credit,
          debit: transaction.debit,
          balance: transaction.balance,
        })
        .save();
    });
  }
};
