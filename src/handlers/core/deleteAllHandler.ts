import { Context } from "koa";
import { getUserID } from "../../auth/getUserID";
import {
  deleteAllAccountsDal,
  deleteAllSanitizationsDal,
  deleteAllTransactionsDal,
} from "../../dal";

export const deleteAllHandler = async (ctx: Context) => {
  const userID = getUserID(ctx);
  await deleteAllTransactionsDal(userID);
  await deleteAllSanitizationsDal(userID);
  await deleteAllAccountsDal(userID);
  ctx.body = {};
};
