import { sql } from "@vercel/postgres";
import { CookingAddDTO } from "~/server/typings";

export default defineEventHandler(async event => {
  const body = await readBody(event) as CookingAddDTO;

  await sql`INSERT INTO cooked (UserId, RecipeId, Images) VALUES (${body.userId}, ${body.recipeId}, ${body.imageUrl})`;
});
