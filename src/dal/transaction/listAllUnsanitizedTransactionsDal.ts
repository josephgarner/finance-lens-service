import { transactionData } from "../../db";

export const getAllUnsanitizedTransactionsDal = async (
  account: string,
  userID: string
) => {
  const listAllUnsanitizedTransactions = await transactionData
    .find({ account: account, userID: userID, sanitizedDescription: null })
    .exec();
  return listAllUnsanitizedTransactions;
};
