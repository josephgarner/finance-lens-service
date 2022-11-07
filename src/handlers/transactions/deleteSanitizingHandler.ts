import { Context } from "koa";
import { z } from "zod";
import { deleteSanitizingDal } from "../../dal";
import { validate } from "../../utils";

const deleteSanitizingSchema = z.object({
  body: z.object({
    id: z.string(),
  }),
});

export const deleteSanitizingHandler = async (ctx: Context) => {
  await validate(deleteSanitizingSchema, ctx);

  const body = ctx.request.body!;

  await deleteSanitizingDal(body.id as string);

  ctx.body = body;
};
