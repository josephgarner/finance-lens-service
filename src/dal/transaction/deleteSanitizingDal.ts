import { sanitizationModel } from "../../db";

export const deleteSanitizingDal = async (id: string) => {
  await sanitizationModel.deleteOne({ _id: id });
};
