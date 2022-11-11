import { Context } from "koa";
import { getUserID } from "../../auth/getUserID";
import { listSanitizing } from "../../dal";

export const listSanitizingHandler = async (ctx: Context) => {
  const rawData = await listSanitizing(getUserID(ctx));
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
