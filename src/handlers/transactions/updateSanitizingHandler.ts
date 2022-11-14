import { Context } from "koa";
import { z } from "zod";
import { getUserID } from "../../auth/getUserID";
import { updateSanitizingDal } from "../../dal/transaction/updateSanitizingDal";
import { sanitizationModel } from "../../db";
import { Sanitization } from "../../types";
import { validate } from "../../utils";

const updateSanitizingSchema = z.object({
  body: z.object({
    id: z.string(),
    keywords: z.string().array(),
    sanitizedDescription: z.string(),
    type: z.string(),
    category: z.string().optional(),
    subcategory: z.string().optional(),
    vendor: z.string(),
  }),
});

export const updateSanitizingHandler = async (ctx: Context) => {
  await validate(updateSanitizingSchema, ctx);

  const sanitization = ctx.request.body as Sanitization;

  await updateSanitizingDal(sanitization, getUserID(ctx));

  ctx.body = { result: { sanitization: sanitization } };
};
