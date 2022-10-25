import { accountData } from "../../db";
import { Account } from "../../types";

export const updateBalanceDal = (account: Account) => {
  accountData
    .updateOne(
      {
        accountName: account.accountName,
        bank: account.bank,
        balanceSince: { $lte: account.balanceSince },
      },
      { balance: account.balance },
      {},
      (error, docs) => {
        if (error) {
          throw new Error("Error updating account balance");
        }
      }
    )
    .exec();
};
