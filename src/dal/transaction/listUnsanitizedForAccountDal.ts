import { transactionData } from "../../db";

export const listUnsanitizedForAccountDal = async (
  account: string,
  userID: string,
  pageNumber: number
) => {
  const LIMIT = 50;

  const total = await transactionData
    .find({ sanitizedDescription: null, account: account, userID: userID })
    .count()
    .exec();
  const totalPages = Math.ceil(total / LIMIT);
  const results = await transactionData
    .find({ sanitizedDescription: null, account: account, userID: userID })
    .sort({ date: -1 })
    .skip(pageNumber > 0 ? (pageNumber - 1) * LIMIT : 0)
    .limit(LIMIT)
    .exec();
  return { totalPages, results };
};
