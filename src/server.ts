import Koa from "koa";
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
import bodyParser from "koa-bodyparser";
import jwt from "koa-jwt";
import { connectToDatabase } from "./db";
import { rootRouter } from "./routes";
import jwtrsa from "jwks-rsa";
import { env } from "process";

const cors = require("@koa/cors");
const logger = require("koa-logger");
const app = new Koa();

console.log("ENV:", process.env.NODE_ENV);
connectToDatabase();

// run app
app.use(cors());
app.use(
  jwt({
    secret: jwtrsa.koaJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: process.env.JWKSURI || "",
    }),
    audience: process.env.AUDIENCE,
    issuer: process.env.ISSUER,
    cookie: "Authorization",
    algorithms: ["RS256"],
  })
);

app.use((ctx, next) => {
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = "Protected resource, use Authorization header to get access\n";
    } else {
      throw err;
    }
  });
});
app.use(bodyParser());
app.use(logger());
app.use(rootRouter.routes());
app.use(rootRouter.allowedMethods());

app.on("error", function (error) {
  console.log("Server has thrown and error");
  console.log(error);
});

console.log(rootRouter.stack.map((i) => i.path));

app.listen(4000);
