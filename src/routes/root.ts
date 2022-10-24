import { id } from "date-fns/locale";
import Router from "@koa/router";
import { z } from "zod";
import { handleError, validate } from "../utils";
import { transactionRoute } from "./transactionRoute";

export const rootRouter = new Router();

rootRouter.use(transactionRoute.routes());
rootRouter.use(transactionRoute.allowedMethods());
