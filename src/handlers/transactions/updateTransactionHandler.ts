import { Context } from "koa";
import { z } from "zod";
import { updateTransactionDal } from "../../dal/transaction/updateTransactionDal";
import { sanitizationModel, transactionData } from "../../db";
import { Transaction } from "../../types";
import { validate } from "../../utils";

const updateTransactionSchema = z.object({
  body: z.object({
    date: z.string(),
    rawDescription: z.string(),
    sanitizedDescription: z.string(),
    account: z.string(),
    type: z.string(),
    category: z.string().optional(),
    vendor: z.string().optional(),
    credit: z.number(),
    debit: z.number(),
    balance: z.number(),
  }),
});

export const updateTransactionHandler = async (ctx: Context) => {
  await validate(updateTransactionSchema, ctx);

  const body = ctx.request.body as Transaction;

  await updateTransactionDal(body);

  ctx.body = body;
};
