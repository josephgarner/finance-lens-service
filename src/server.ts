import Koa from "koa";
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
import bodyParser from "koa-bodyparser";
import { connectToDatabase } from "./db";
import { rootRouter } from "./routes";

const cors = require("@koa/cors");
const logger = require("koa-logger");
const app = new Koa();

console.log("ENV:", process.env.NODE_ENV);
connectToDatabase();

// run app
app.use(bodyParser());
app.use(rootRouter.routes());
app.use(rootRouter.allowedMethods());
app.use(logger());
app.use(cors());

app.on("error", function (error) {
  console.log("Server has thrown and error");
  console.log(error);
});

console.log(rootRouter.stack.map((i) => i.path));

app.listen(4000);
