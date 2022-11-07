import { Context } from "koa";
import { getAllUnsanitizedTransactionsDal } from "../../dal/transaction/getAllUnsanitizedTransactionsDal";
import { updateTransactionDal } from "../../dal/transaction/updateTransactionDal";
import { transactionSanitization } from "../../factory";
import { Bank } from "../../types";

export const runSanitizationHandler = async (ctx: Context) => {
  const { account } = ctx.params;
  const transactions = await getAllUnsanitizedTransactionsDal(account);
  const sanitsiedTransactions = await transactionSanitization(
    Bank.INTERNAL,
    account,
    [],
    transactions
  );
  sanitsiedTransactions.map(async (sanitsied) => {
    await updateTransactionDal(sanitsied);
  });
  ctx.body = {};
};
