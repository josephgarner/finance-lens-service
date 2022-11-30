import { sanitizationModel } from "../../db";

export const deleteAllSanitizationsDal = async (userID: string) => {
  await sanitizationModel.deleteMany({ userID: userID });
};
