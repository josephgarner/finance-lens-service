import { Context } from "koa";
import { z } from "zod";
import { sanitizationModel } from "../../db";
import { Sanitization } from "../../types";
import { validate } from "../../utils";

const updateSanitizingSchema = z.object({
  body: z.object({
    id: z.string(),
    rawDescription: z.string(),
    sanitizedDescription: z.string(),
    type: z.string(),
    category: z.string().optional(),
    vendor: z.string(),
  }),
});

export const updateSanitizingHandler = async (ctx: Context) => {
  await validate(updateSanitizingSchema, ctx);

  const body = ctx.request.body as Sanitization;

  await sanitizationModel.updateOne(
    { id: body.id },
    {
      rawDescription: body.rawDescription,
      sanitizedDescription: body.sanitizedDescription,
      type: body.type,
      category: body.category,
      vendor: body.vendor,
    }
  );

  ctx.body = body;
};
