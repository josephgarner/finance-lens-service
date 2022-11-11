import { Context } from "koa";

export const getUserID = (ctx: Context) => {
  const token = ctx.header.authorization?.replace("Bearer ", "");
  if (token) {
    const authData = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );
    return authData.sub;
  }
  throw Error("User ID not found");
};
