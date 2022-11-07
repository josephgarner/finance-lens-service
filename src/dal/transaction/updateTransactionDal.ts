import { transactionData } from "../../db";
import { Transaction } from "../../types";

export const updateTransactionDal = async (transaction: Transaction) => {
  await transactionData.updateOne(
    { date: transaction.date, rawDescription: transaction.rawDescription },
    {
      sanitizedDescription: transaction.sanitizedDescription,
      type: transaction.type,
      category: transaction.category,
      vendor: transaction.vendor,
    }
  );
};
