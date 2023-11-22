import { recipesRepository } from "~/server/infra/recipes.repository";
import { HitItem } from "~/server/typings";

export default defineEventHandler<{}, Promise<HitItem>>(async (event) => {
  const params = event.context.params;

  if (!params?.id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
    })
  }

  return await recipesRepository.getRecipe(params.id);
})
