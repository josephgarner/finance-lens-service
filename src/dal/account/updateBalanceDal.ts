import { accountData } from "../../db";
import { Account } from "../../types";

export const updateBalanceDal = async (account: Account, userID: string) => {
  await accountData
    .updateOne(
      {
        userID: userID,
        accountName: account.accountName,
        bank: account.bank,
        balanceSince: { $not: { $gte: account.balanceSince } },
      },
      { balance: account.balance, balanceSince: account.balanceSince }
    )
    .exec();
};
