import { transactionData } from "../../db";

export const getAllUnsanitizedTransactionsDal = async (account: String) => {
  const allUnsanitizedTransactions = await transactionData
    .find({ account: account, sanitizedDescription: null })
    .exec();
  return allUnsanitizedTransactions;
};
