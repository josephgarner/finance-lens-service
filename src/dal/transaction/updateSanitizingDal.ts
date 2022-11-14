import { sanitizationModel } from "../../db";
import { Sanitization } from "../../types";

export const updateSanitizingDal = async (
  sanitization: Sanitization,
  userID: string
) => {
  await sanitizationModel.updateOne(
    { id: sanitization.id, userID: userID },
    {
      keywords: sanitization.keywords,
      sanitizedDescription: sanitization.sanitizedDescription,
      type: sanitization.type,
      category: sanitization.category,
      subcategory: sanitization.subcategory,
      vendor: sanitization.vendor,
    }
  );
};
