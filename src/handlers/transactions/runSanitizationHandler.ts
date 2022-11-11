import { Context } from "koa";
import { getUserID } from "../../auth/getUserID";
import { getAllUnsanitizedTransactionsDal } from "../../dal/transaction/listAllUnsanitizedTransactionsDal";
import { updateTransactionDal } from "../../dal/transaction/updateTransactionDal";
import { transactionSanitization } from "../../factory";
import { Bank } from "../../types";

export const runSanitizationHandler = async (ctx: Context) => {
  const { account } = ctx.params;
  const userID = getUserID(ctx);
  const transactions = await getAllUnsanitizedTransactionsDal(account, userID);
  const sanitsiedTransactions = await transactionSanitization(
    Bank.INTERNAL,
    account,
    userID,
    [],
    transactions
  );
  sanitsiedTransactions.map(async (sanitsied) => {
    await updateTransactionDal(sanitsied, getUserID(ctx));
  });
  ctx.body = {};
};
