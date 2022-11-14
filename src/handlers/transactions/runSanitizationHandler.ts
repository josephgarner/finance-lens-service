import { Context } from "koa";
import { z } from "zod";
import { getUserID } from "../../auth/getUserID";
import { getAllUnsanitizedTransactionsDal } from "../../dal/transaction/listAllUnsanitizedTransactionsDal";
import { updateTransactionDal } from "../../dal/transaction/updateTransactionDal";
import { transactionSanitization } from "../../factory";
import { Bank } from "../../types";
import { validate } from "../../utils";

const listAllSchema = z.object({
  body: z.object({
    account: z.string(),
  }),
});

type Query = {
  account: string;
};

export const runSanitizationHandler = async (ctx: Context) => {
  await validate(listAllSchema, ctx);

  const { account } = ctx.request.body as Query;
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
