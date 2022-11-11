import { Context } from "koa";
import { z } from "zod";
import { getUserID } from "../../auth/getUserID";
import { createAccountDAL } from "../../dal";
import { Account, Bank } from "../../types";
import { validate } from "../../utils";

const accountSchema = z.object({
  body: z.object({
    accountName: z.string(),
    accountType: z.string(),
    bank: z.nativeEnum(Bank),
  }),
});

export const createHandler = async (ctx: Context) => {
  console.log(ctx.body);
  await validate(accountSchema, ctx);

  const account = ctx.request.body as Account;

  await createAccountDAL(account, getUserID(ctx));

  ctx.body = { result: { account: account } };
};
