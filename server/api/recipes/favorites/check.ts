import { sql } from "@vercel/postgres";
import { FavoriteAddDTO } from "~/server/typings";

export default defineEventHandler(async event => {
  const body = await readBody(event) as FavoriteAddDTO;

  const { rows: favorites } = await sql`SELECT * FROM favorites WHERE UserId=${body.userId} AND RecipeId=${body.recipeId}`;

  if (favorites.length > 0) {
    return true;
  }

  return false;
});
