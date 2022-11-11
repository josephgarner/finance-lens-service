import { accountData } from "../../db";

export const listAccountsDAL = async (userID: string) => {
  return await accountData.find({ userID: userID }).exec();
};
