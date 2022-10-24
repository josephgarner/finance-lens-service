import { z } from "zod";
import Multer from "@koa/multer";
import Router from "@koa/router";
import { handleError, validate } from "../utils";
import { uploadTransactionHistoryHandler } from "../handlers";
import { Sanitization } from "../types";
import { sanitizationModel } from "../db";

export const transactionRoute = new Router({ prefix: "/transaction" });

const form = Multer();

transactionRoute.post(
  "/upload-transaction-history",
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
      uploadTransactionHistoryHandler(ctx);
    }, ctx);
  }
);

const sanitizingSchema = z.object({
  body: z.object({
    rawDescription: z.string(),
    sanitizedDescription: z.string(),
    type: z.string(),
    category: z.string().optional(),
    vendor: z.string(),
  }),
});

transactionRoute.post("/add-sanitizing-transaction", async (ctx, next) => {
  await handleError(async () => {
    await next();
    await validate(sanitizingSchema, ctx);
    const body = ctx.request.body as Sanitization;

    await sanitizationModel
      .build({
        rawDescription: body.rawDescription,
        sanitizedDescription: body.sanitizedDescription,
        type: body.type,
        category: body.category,
        vendor: body.vendor,
      })
      .save();

    ctx.body = body;
  }, ctx);
});

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

transactionRoute.post("/update-sanitizing-transaction", async (ctx, next) => {
  await handleError(async () => {
    await next();
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
  }, ctx);
});
