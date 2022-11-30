import { transactionData } from "../../db";

export const deleteAllTransactionsDal = async (userID: string) => {
  await transactionData.deleteMany({ userID: userID });
};
