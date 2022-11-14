import { transactionData } from "../../db";
import { Transaction } from "../../types";

export const updateTransactionDal = async (
  transaction: Transaction,
  userID: string
) => {
  await transactionData.updateOne(
    {
      date: transaction.date,
      rawDescription: transaction.rawDescription,
      userID: userID,
    },
    {
      sanitizedDescription: transaction.sanitizedDescription,
      type: transaction.type,
      category: transaction.category,
      subcategory: transaction.subcategory,
      vendor: transaction.vendor,
    }
  );
};
