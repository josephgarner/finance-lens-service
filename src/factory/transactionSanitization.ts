import { listSanitizing } from "../dal";
import { Bank, Sanitization, Transaction, TransactionType } from "../types";
import { toCents } from "../utils";
import { INGTransaction } from "./types";

type TransactionData = INGTransaction;

export const transactionSanitization = async (
  bank: Bank,
  account: string,
  userID: string,
  transactionData?: TransactionData[],
  processedTransactions?: Transaction[]
) => {
  const sanitsingData: Sanitization[] = await listSanitizing(userID);
  const sanitizationOutput: Transaction[] = [];
  switch (bank) {
    case Bank.ING:
      {
        if (transactionData) {
          transactionData.forEach(async (transaction) => {
            const sanitsingTransaction = sanitsingData.filter(
              (sanitsiedTransaction) => {
                const keywordResult = sanitsiedTransaction.keywords.map(
                  (word) => {
                    return transaction.description
                      .toLocaleLowerCase()
                      .includes(word.toLocaleLowerCase());
                  }
                );
                const typeMatch =
                  (transaction.debit &&
                    (sanitsiedTransaction.type === TransactionType.EXPENSE ||
                      sanitsiedTransaction.type ===
                        TransactionType.TRANSFER)) ||
                  (transaction.credit &&
                    sanitsiedTransaction.type === TransactionType.INCOME);
                return keywordResult.every((e) => e === true) && typeMatch;
              }
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
                userID: "",
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
                userID: "",
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
              (sanitsiedTransaction) => {
                const keywordResult = sanitsiedTransaction.keywords.map(
                  (word) => {
                    return transaction.rawDescription
                      .toLocaleLowerCase()
                      .includes(word.toLocaleLowerCase());
                  }
                );
                const typeMatch =
                  (transaction.debit &&
                    (sanitsiedTransaction.type === TransactionType.EXPENSE ||
                      sanitsiedTransaction.type ===
                        TransactionType.TRANSFER)) ||
                  (transaction.credit &&
                    sanitsiedTransaction.type === TransactionType.INCOME);
                return keywordResult.every((e) => e === true) && typeMatch;
              }
            );
            if (sanitsingTransaction.length > 0) {
              const cleanTrans = sanitsingTransaction[0];
              sanitizationOutput.push({
                userID: "",
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
