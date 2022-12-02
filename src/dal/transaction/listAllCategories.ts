import { transactionData } from "../../db";

export const listAllCategories = async (userID: string) => {
  console.log("query");
  let categories = await transactionData
    .find({ userID: userID })
    .select("category")
    .distinct("category")
    .exec();

  let subcategories = await transactionData
    .find({ userID: userID })
    .select("subcategory")
    .distinct("subcategory")
    .exec();
  subcategories = subcategories.filter((e) => e !== null || e !== "");
  categories = categories.filter((e) => e !== null || e !== "");
  console.log(categories, subcategories);
  return { categories, subcategories };
};
