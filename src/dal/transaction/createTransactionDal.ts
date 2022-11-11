import { transactionData } from "../../db";
import { Transaction } from "../../types";

export const createTransactionDal = async (
  transaction: Transaction,
  userID: string
) => {
  await transactionData
    .build({
      userID: userID,
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
};
