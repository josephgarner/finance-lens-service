import { Context } from "koa";
import { getAllUnsanitizedTransactionsDal } from "../../dal/transaction/getAllUnsanitizedTransactionsDal";
import { transactionSanitization } from "../../factory";
import { Bank } from "../../types";

export const runSanitizationHandler = async (ctx: Context) => {
  const { account } = ctx.params;
  const transactions = await getAllUnsanitizedTransactionsDal(account);
  const sanitsiedTransactions = await transactionSanitization(
    Bank.INTERNAL,
    account,
    transactions
  );
  console.log(sanitsiedTransactions);
  ctx.body = {};
};
