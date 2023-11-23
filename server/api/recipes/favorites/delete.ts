import { sql } from "@vercel/postgres";
import { FavoriteAddDTO } from "~/server/typings";

export default defineEventHandler(async event => {
  const body = await readBody(event) as FavoriteAddDTO;

  const { rowCount: favoritesCount } = await sql`SELECT * FROM favorites WHERE UserId=${body.userId} AND RecipeId=${body.recipeId}`;

  if (favoritesCount === 0) {
    throw createError({ statusCode: 401, statusMessage: "Doesn't exists" });
  }

  await sql`DELETE FROM favorites WHERE UserId=${body.userId} AND RecipeId=${body.recipeId}`;
});
