import { transactionData } from "../../db";

export const listAllCategories = async (userID: string) => {
  console.log("query");
  const categories = await transactionData
    .find({ userID: userID })
    .select("category")
    .distinct("category")
    .exec();

  const subcategories = await transactionData
    .find({ userID: userID })
    .select("subcategory")
    .distinct("subcategory")
    .exec();
  console.log(categories, subcategories);
  return { categories, subcategories };
};
