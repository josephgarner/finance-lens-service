import { transactionData } from "../../db";

export const listUnsanitizedForAccountDal = async (
  account: string,
  userID: string
) => {
  return await transactionData
    .find({ sanitizedDescription: null, account: account, userID: userID })
    .exec();
};
