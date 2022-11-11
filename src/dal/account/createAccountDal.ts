import { accountData } from "../../db";
import { Account } from "../../types";

export const createAccountDAL = async (account: Account, userID: string) => {
  await accountData
    .build({
      userID: userID,
      accountName: account.accountName,
      accountType: account.accountType,
      bank: account.bank,
    })
    .save();
};
