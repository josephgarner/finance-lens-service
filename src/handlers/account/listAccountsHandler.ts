import { Context } from "koa";
import { getUserID } from "../../auth/getUserID";
import { listAccountsDAL } from "../../dal";

export const listAccountsHandler = async (ctx: Context) => {
  const rawList = await listAccountsDAL(getUserID(ctx));
  const accountList = rawList.map((account) => ({
    accountName: account.accountName,
    accountType: account.accountType,
    balance: account.balance,
    bank: account.bank,
    balanceSince: account.balanceSince,
  }));
  ctx.body = { result: { accounts: accountList } };
};
