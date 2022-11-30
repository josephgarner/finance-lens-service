import Router from "@koa/router";
import { accountRoute } from "./accountRoutes";
import { coreRoute } from "./core";
import { transactionRoute } from "./transactionRoute";

export const rootRouter = new Router({ prefix: "/v1" });

rootRouter.use(coreRoute.routes());
rootRouter.use(coreRoute.allowedMethods());

rootRouter.use(transactionRoute.routes());
rootRouter.use(transactionRoute.allowedMethods());

rootRouter.use(accountRoute.routes());
rootRouter.use(accountRoute.allowedMethods());
