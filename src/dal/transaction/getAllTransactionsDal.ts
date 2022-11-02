import { transactionData } from "../../db";

export const getAllTransactionsDal = async (account: String) => {
  const allTransactions = await transactionData
    .find({ account: account })
    .exec();
  return allTransactions;
};
