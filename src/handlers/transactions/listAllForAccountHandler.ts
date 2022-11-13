import { Context } from "koa";
import { getUserID } from "../../auth/getUserID";
import { listAllTransactionsDal } from "../../dal";

export const listAllForAccountHandler = async (ctx: Context) => {
  const { account, pageNumber } = ctx.params;

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
