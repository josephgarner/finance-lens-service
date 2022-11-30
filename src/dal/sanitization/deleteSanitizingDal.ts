import { sanitizationModel } from "../../db";

export const deleteSanitizingDal = async (id: string, userID: string) => {
  await sanitizationModel.deleteOne({ _id: id, userID: userID });
};
