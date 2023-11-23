import { sql } from "@vercel/postgres";
import { appId, appKey, recipesURL } from "~/server/infra/consts";
import { recipesRepository } from "~/server/infra/recipes.repository";
import { FiltersObject } from "~/server/typings";

export default defineEventHandler<{ body: FiltersObject }>(async (event) => {
  const result = await sql`SELECT * FROM users`;
  return {
    result
  }
})
