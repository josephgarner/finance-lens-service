import { transactionData } from "../../db";

export const listAllTransactionsDal = async (
  account: String,
  userID: string
) => {
  return await transactionData
    .find({ account: account, userID: userID })
    .exec();
};
