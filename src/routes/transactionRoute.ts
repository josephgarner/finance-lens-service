import Multer from "@koa/multer";
import Router from "@koa/router";
import { handleError } from "../utils";
import {
  addSanitizingHandler,
  listAllHandler,
  listUnsanitizedHandler,
  updateSanitizingHandler,
  uploadHistoryHandler,
} from "../handlers";

export const transactionRoute = new Router({ prefix: "/transaction" });

const form = Multer();

transactionRoute.post(
  "/upload-history",
  form.fields([
    {
      name: "transactionRecord",
      maxCount: 1,
    },
    {
      name: "bank",
      maxCount: 1,
    },
    {
      name: "account",
      maxCount: 1,
    },
  ]),
  async (ctx, next) => {
    await handleError(async () => {
      await next();
      uploadHistoryHandler(ctx);
    }, ctx);
  }
);

transactionRoute.get("/list-all", async (ctx, next) => {
  await handleError(async () => {
    await next();
    await listAllHandler(ctx);
  }, ctx);
});

transactionRoute.get("/list-unsanitized", async (ctx, next) => {
  await handleError(async () => {
    await next();
    await listUnsanitizedHandler(ctx);
  }, ctx);
});

transactionRoute.post("/add-sanitizing", async (ctx, next) => {
  await handleError(async () => {
    await next();
    await addSanitizingHandler(ctx);
  }, ctx);
});

transactionRoute.post("/update-sanitizing", async (ctx, next) => {
  await handleError(async () => {
    await next();
    await updateSanitizingHandler(ctx);
  }, ctx);
});
