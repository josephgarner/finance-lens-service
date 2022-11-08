import { Context } from "koa";
import { transactionData } from "../../db";

export const listAllForAccountHandler = async (ctx: Context) => {
  const { account } = ctx.params;
  const rawData = await transactionData.find({ account: account }).exec();
  const allTransactions = rawData.map((transaction) => ({
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
  allTransactions.sort(
    (transA, transB) => transA.date.getTime() - transB.date.getTime()
  );
  ctx.body = { result: { transactions: allTransactions } };
};
