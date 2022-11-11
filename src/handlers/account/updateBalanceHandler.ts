import { Context } from "koa";
import { z } from "zod";
import { getUserID } from "../../auth/getUserID";
import { updateBalanceDal } from "../../dal";
import { Account, Bank } from "../../types";
import { validate } from "../../utils";

const accountSchema = z.object({
  body: z.object({
    accountName: z.string(),
    balance: z.number(),
    bank: z.nativeEnum(Bank),
    balanceSince: z.date(),
  }),
});

export const updateBalanceHandler = async (ctx: Context) => {
  await validate(accountSchema, ctx);

  const body = ctx.request.body as Account;

  updateBalanceDal(body, getUserID(ctx));

  ctx.body = body;
};
