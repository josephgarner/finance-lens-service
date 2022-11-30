import { accountData } from "../../db";

export const deleteAllAccountsDal = async (userID: string) => {
  await accountData.deleteMany({ userID: userID });
};
