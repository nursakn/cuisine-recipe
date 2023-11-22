import { FiltersObject, RecipesResponse, HitItem } from './../typings';
import { appId, appKey, recipesURL } from "./consts";

export const recipesRepository = {
  baseSearchParams: {type: "public", app_id: appId, app_key: appKey},
  async getRecipes(filters: FiltersObject): Promise<RecipesResponse> {
    const response = await fetch(`${recipesURL}?` + new URLSearchParams({...this.baseSearchParams, ...filters}))

    return response.json();
  },
  async getRecipe(id: string): Promise<HitItem> {
    const response = await fetch(`${recipesURL}/${id}?` + new URLSearchParams(this.baseSearchParams))

    return response.json();
  }
}