import { appId, appKey, recipesURL } from "~/server/infra/consts";
import { recipesRepository } from "~/server/infra/recipes.repository";
import { FiltersObject } from "~/server/typings";

export default defineEventHandler<{ body: FiltersObject }>(async (event) => {
  const body = await readBody(event);
  console.log("body", body);
  // const result = await recipesRepository.getRecipes({ cuisineType });

  return {
    body
  }
})
