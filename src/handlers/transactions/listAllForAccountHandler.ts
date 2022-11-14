import { Context } from "koa";
import { ParsedUrlQuery } from "querystring";
import { z } from "zod";
import { getUserID } from "../../auth/getUserID";
import { listAllTransactionsDal } from "../../dal";
import { validate } from "../../utils";

const listAllSchema = z.object({
  query: z.object({
    account: z.string(),
    pageNumber: z.string(),
  }),
});

type Query = ParsedUrlQuery & {
  account: string;
  pageNumber: number;
};

export const listAllForAccountHandler = async (ctx: Context) => {
  await validate(listAllSchema, ctx);

  const { account, pageNumber } = ctx.request.query as Query;

  const { totalPages, results } = await listAllTransactionsDal(
    account,
    getUserID(ctx),
    pageNumber
  );

  const allTransactions = results.map((transaction) => ({
    date: transaction.date,
    userID: transaction.userID,
    rawDescription: transaction.rawDescription,
    sanitizedDescription: transaction.sanitizedDescription,
    account: transaction.account,
    type: transaction.type,
    category: transaction.category,
    subcategory: transaction.subcategory,
    vendor: transaction.vendor,
    credit: transaction.credit,
    debit: transaction.debit,
    balance: transaction.balance,
  }));
  ctx.body = {
    result: {
      totalPages: totalPages,
      pageNumber: pageNumber,
      transactions: allTransactions,
    },
  };
};
