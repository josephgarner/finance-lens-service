import { Context } from "koa";
import { Readable } from "stream";
import csv from "csv-parser";
import { Bank, UploadFiles } from "../../types";
import { transactionSanitization } from "../../factory";

export const uploadTransactionHistoryHandler = (ctx: Context) => {
  const body = ctx.request.body;
  const files = ctx.request.files as UploadFiles;

  const results: any[] = [];
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
      .on("data", (data) => results.push(data))
      .on("end", () => {
        transactionSanitization(
          results,
          body.bank as Bank,
          body.account as string
        );
      });
  }
  ctx.body = "Transaction List ingested";
};
