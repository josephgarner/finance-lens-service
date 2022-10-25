import { Context } from "koa";
import { accountData } from "../../db/models/accountModel";

export const listAccountsHandler = async (ctx: Context) => {
  const rawList = await accountData.find().exec();
  const accountList = rawList.map((account) => ({
    accountName: account.accountName,
    accountType: account.accountType,
    balance: account.balance,
    bank: account.bank,
    balanceSince: account.balanceSince,
  }));
  ctx.body = accountList;
};
