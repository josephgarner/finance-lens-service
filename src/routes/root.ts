import Router from "@koa/router";
import { accountRoute } from "./accountRoutes";
import { transactionRoute } from "./transactionRoute";

export const rootRouter = new Router({ prefix: "/api" });

rootRouter.use(transactionRoute.routes());
rootRouter.use(transactionRoute.allowedMethods());

rootRouter.use(accountRoute.routes());
rootRouter.use(accountRoute.allowedMethods());
