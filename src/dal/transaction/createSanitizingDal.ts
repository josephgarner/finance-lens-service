import { sanitizationModel } from "../../db";
import { Sanitization } from "../../types";

export const createSanitizingDal = async (
  sanitization: Sanitization,
  userID: string
) => {
  await await sanitizationModel
    .build({
      userID: userID,
      keywords: sanitization.keywords,
      sanitizedDescription: sanitization.sanitizedDescription,
      type: sanitization.type,
      category: sanitization.category,
      vendor: sanitization.vendor,
    })
    .save();
};
