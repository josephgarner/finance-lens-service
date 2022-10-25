import { Context } from "koa";
import { z } from "zod";
import { accountData } from "../../db/models/accountModel";
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
  await validate(accountSchema, ctx);

  const body = ctx.request.body as Account;

  await accountData
    .build({
      accountName: body.accountName,
      accountType: body.accountType,
      bank: body.bank,
    })
    .save();

  ctx.body = body;
};
