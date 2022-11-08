import { Context } from "koa";
import { sanitizationModel } from "../../db";

export const listSanitizingHandler = async (ctx: Context) => {
  const rawData = await sanitizationModel.find().exec();
  const allSanitization = rawData.map((sanitization) => ({
    id: sanitization.id,
    keywords: sanitization.keywords,
    sanitizedDescription: sanitization.sanitizedDescription,
    type: sanitization.type,
    category: sanitization.category,
    vendor: sanitization.vendor,
  }));
  ctx.body = { result: { sanitization: allSanitization } };
};
