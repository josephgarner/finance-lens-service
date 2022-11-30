import Router from "@koa/router";
import { deleteAllHandler } from "../handlers";
import { handleError } from "../utils";

export const coreRoute = new Router({ prefix: "/core" });

coreRoute.post("/delete-data", async (ctx, next) => {
  console.log("here");
  await handleError(async () => {
    await next();
    await deleteAllHandler(ctx);
  }, ctx);
});
