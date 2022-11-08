import { Context } from "koa";
import { z } from "zod";
import { sanitizationModel } from "../../db";
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

  const body = ctx.request.body as Sanitization;

  await sanitizationModel
    .build({
      keywords: body.keywords,
      sanitizedDescription: body.sanitizedDescription,
      type: body.type,
      category: body.category,
      vendor: body.vendor,
    })
    .save();

  ctx.body = body;
};
