import { sanitizationModel } from "../db";
import { Bank, Sanitization, Transaction, TransactionType } from "../types";
import { toCents } from "../utils";
import { INGTransaction } from "./types";

type TransactionData = INGTransaction;

export const transactionSanitization = async (
  bank: Bank,
  account: string,
  transactionData?: TransactionData[],
  processedTransactions?: Transaction[]
) => {
  const sanitsingData: Sanitization[] = await sanitizationModel.find();
  const sanitizationOutput: Transaction[] = [];
  switch (bank) {
    case Bank.ING:
      {
        if (transactionData) {
          transactionData.forEach(async (transaction) => {
            const sanitsingTransaction = sanitsingData.filter(
              (sanitsiedTransaction) =>
                transaction.description.includes(
                  sanitsiedTransaction.rawDescription
                )
            );
            const dateSplit = transaction.date.split("/");
            const date = new Date(
              Number(dateSplit[2]),
              Number(dateSplit[1]) - 1,
              Number(dateSplit[0])
            );
            if (sanitsingTransaction.length > 0) {
              const cleanTrans = sanitsingTransaction[0];
              sanitizationOutput.push({
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
                balance: toCents(Number(transaction.balance)),
              });
            } else {
              sanitizationOutput.push({
                date: date,
                type: transaction.debit
                  ? TransactionType.EXPENSE
                  : TransactionType.INCOME,
                rawDescription: transaction.description,
                account: account,
                credit: toCents(Number(transaction.credit)),
                debit: toCents(Number(transaction.debit)),
                balance: toCents(Number(transaction.balance)),
              });
            }
          });
        }
      }
      break;
    case Bank.INTERNAL:
      {
        if (processedTransactions) {
          processedTransactions.forEach((transaction) => {
            const sanitsingTransaction = sanitsingData.filter(
              (sanitsiedTransaction) =>
                transaction.rawDescription.includes(
                  sanitsiedTransaction.rawDescription
                )
            );
            if (sanitsingTransaction.length > 0) {
              const cleanTrans = sanitsingTransaction[0];
              sanitizationOutput.push({
                date: transaction.date,
                type: cleanTrans.type
                  ? cleanTrans.type
                  : transaction.debit
                  ? TransactionType.EXPENSE
                  : TransactionType.INCOME,
                rawDescription: transaction.rawDescription,
                sanitizedDescription: cleanTrans.sanitizedDescription,
                account: account,
                category: cleanTrans.category,
                vendor: cleanTrans.vendor,
                credit: toCents(Number(transaction.credit)),
                debit: toCents(Number(transaction.debit)),
                balance: toCents(Number(transaction.balance)),
              });
            }
          });
        }
      }
      break;
    default: {
      console.error("Bank not supported");
    }
  }
  return sanitizationOutput;
};
