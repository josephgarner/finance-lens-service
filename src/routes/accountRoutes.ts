import Router from "@koa/router";
import {
  createHandler,
  listAccountsHandler,
  updateBalanceHandler,
} from "../handlers";
import { handleError } from "../utils";

export const accountRoute = new Router({ prefix: "/account" });

accountRoute.post("/create", async (ctx, next) => {
  await handleError(async () => {
    await next();
    await createHandler(ctx);
  }, ctx);
});

accountRoute.post("/update-balance", async (ctx, next) => {
  await handleError(async () => {
    await next();
    await updateBalanceHandler(ctx);
  }, ctx);
});

accountRoute.get("/list-all", async (ctx, next) => {
  await handleError(async () => {
    await next();
    await listAccountsHandler(ctx);
  }, ctx);
});
