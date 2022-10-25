import { Context } from "koa";
import { transactionData } from "../../db";

export const listAllHandler = async (ctx: Context) => {
  const rawData = await transactionData.find().exec();
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
  ctx.body = allTransactions;
};
