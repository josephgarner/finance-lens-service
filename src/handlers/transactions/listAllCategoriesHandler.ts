import { Context } from "koa";
import { z } from "zod";
import { getUserID } from "../../auth/getUserID";
import { listAllCategories } from "../../dal";
import { validate } from "../../utils";

export const listAllCategoriesHandler = async (ctx: Context) => {
  const { categories, subcategories } = await listAllCategories(getUserID(ctx));
  ctx.body = {
    result: {
      categories: categories,
      subcategories: subcategories,
    },
  };
};
