import { Context } from "koa";
import { transactionData } from "../../db";

/** DO NOT USE */
export const listUnsanitizedHandler = async (ctx: Context) => {
  // const rawData = await transactionData
  //   .find({ sanitizedDescription: null })
  //   .exec();
  // const allTransactions = rawData.map((transaction) => ({
  //   date: transaction.date,
  //   rawDescription: transaction.rawDescription,
  //   sanitizedDescription: transaction.sanitizedDescription,
  //   account: transaction.account,
  //   type: transaction.type,
  //   category: transaction.category,
  //   vendor: transaction.vendor,
  //   credit: transaction.credit,
  //   debit: transaction.debit,
  //   balance: transaction.balance,
  // }));
  // allTransactions.sort(
  //   (transA, transB) => transA.date.getTime() - transB.date.getTime()
  // );
  ctx.body = { result: { transactions: [] } };
};
