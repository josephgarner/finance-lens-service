import { sanitizationModel } from "../../db";

export const listSanitizing = async (userID: string) => {
  return await sanitizationModel.find({ userID: userID }).exec();
};
