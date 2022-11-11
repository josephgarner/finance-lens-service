import { Context } from "koa";
import { z } from "zod";
import { getUserID } from "../../auth/getUserID";
import { createSanitizingDal } from "../../dal";
import { Sanitization } from "../../types";
import { validate } from "../../utils";

const sanitizingSchema = z.object({
  body: z.object({
    keywords: z.string().array(),
    sanitizedDescription: z.string(),
    type: z.string(),
    category: z.string().optional(),
    vendor: z.string(),
  }),
});

export const addSanitizingHandler = async (ctx: Context) => {
  await validate(sanitizingSchema, ctx);

  const sanitization = ctx.request.body as Sanitization;

  await createSanitizingDal(sanitization, getUserID(ctx));

  ctx.body = { result: { sanitization: sanitization } };
};
