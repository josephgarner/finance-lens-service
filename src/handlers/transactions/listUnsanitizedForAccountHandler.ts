import { Context } from "koa";
import { getUserID } from "../../auth/getUserID";
import { listUnsanitizedForAccountDal } from "../../dal";

export const listUnsanitizedForAccountHandler = async (ctx: Context) => {
  const { account, pageNumber } = ctx.params;
  const { totalPages, results } = await listUnsanitizedForAccountDal(
    account,
    getUserID(ctx),
    Number(pageNumber)
  );
  const allTransactions = results.map((transaction) => ({
    date: transaction.date,
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
