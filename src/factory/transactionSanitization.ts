import { sanitizationModel } from "../db";
import { Bank, Sanitization, TransactionType } from "../types";
import { toCents } from "../utils";
import { INGTransaction } from "./types";
import { transactionData as transactionDBData } from "../db";

type TransactionData = INGTransaction;

export const transactionSanitization = async (
  transactionData: TransactionData[],
  bank: Bank,
  account: string
) => {
  const sanitsingData: Sanitization[] = await sanitizationModel.find();

  switch (bank) {
    case Bank.ING:
      {
        transactionData.forEach(async (transaction) => {
          const sanitsingTransaction = sanitsingData.filter(
            (sanitsiedTransaction) =>
              transaction.description.includes(
                sanitsiedTransaction.rawDescription
              )
          );
          if (sanitsingTransaction.length > 0) {
            const cleanTrans = sanitsingTransaction[0];
            const dateSplit = transaction.date.split("/");
            const date = new Date(
              Number(dateSplit[2]),
              Number(dateSplit[1]) - 1,
              Number(dateSplit[0])
            );
            console.log(date);
            await transactionDBData
              .build({
                date: date,
                type: cleanTrans.type
                  ? cleanTrans.type
                  : transaction.debit
                  ? TransactionType.EXPENSE
                  : TransactionType.INCOME,
                rawDescription: transaction.description,
                sanitizedDescription: cleanTrans.sanitizedDescription,
                account: account,
                category: cleanTrans.category,
                vendor: cleanTrans.vendor,
                credit: toCents(Number(transaction.credit)),
                debit: toCents(Number(transaction.debit)),
              })
              .save();
          }
        });
      }
      break;
    default: {
      console.error("Bank not supported");
    }
  }
};
