import { transactionData } from "../../db";
import { Transaction } from "../../types";

export const createTransactionDal = async (
  transaction: Transaction,
  userID: string
) => {
  await transactionData
    .updateOne(
      { rawDescription: transaction.rawDescription },
      {
        userID: userID,
        date: transaction.date,
        type: transaction.type,
        rawDescription: transaction.rawDescription,
        sanitizedDescription: transaction.sanitizedDescription,
        account: transaction.account,
        category: transaction.category,
        subcategory: transaction.subcategory,
        vendor: transaction.vendor,
        credit: transaction.credit,
        debit: transaction.debit,
        balance: transaction.balance,
      },
      { upsert: true }
    )
    .exec();
};
