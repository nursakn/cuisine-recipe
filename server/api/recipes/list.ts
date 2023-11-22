import { recipesRepository } from "~/server/infra/recipes.repository";
import { FiltersObject, RecipesResponse } from "~/server/typings";

export default defineEventHandler<{ query: FiltersObject }, Promise<RecipesResponse>>(async (event) => {
  const query = getQuery(event);

  return await recipesRepository.getRecipes(query);
})
