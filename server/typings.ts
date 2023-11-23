export type LoginRegisterDTO = {
  username: string;
  password: string;
}

export type FavoriteAddDTO = {
  userId: string;
  recipeId: string;
}

export type CookingAddDTO = {
  userId: string;
  recipeId: string;
  imageUrl: string;
}

export type FilterTypes = "cuisineType" | "any"

export type FiltersObject = Partial<Record<FilterTypes, any>>;

export type RecipesResponse = {
  from: number
  to: number
  count: number
  _links: {
    self: {
      href: string
      title: string
    }
    next: {
      href: string
      title: string
    }
  }
  hits: Array<HitItem>
}

export type HitItem = {
  recipe: RecipeItem;
  _links: LinksItem;
}

export type RecipeItem = {
  uri: string
  label: string
  image: string
  images: {
    THUMBNAIL: {
      url: string
      width: number
      height: number
    }
    SMALL: {
      url: string
      width: number
      height: number
    }
    REGULAR: {
      url: string
      width: number
      height: number
    }
    LARGE: {
      url: string
      width: number
      height: number
    }
  }
  source: string
  url: string
  shareAs: string
  yield: number
  dietLabels: Array<string>
  healthLabels: Array<string>
  cautions: Array<string>
  ingredientLines: Array<string>
  ingredients: Array<{
    text: string
    quantity: number
    measure: string
    food: string
    weight: number
    foodId: string
  }>
  calories: number
  glycemicIndex: number
  totalCO2Emissions: number
  co2EmissionsClass: string
  totalWeight: number
  cuisineType: Array<string>
  mealType: Array<string>
  dishType: Array<string>
  instructions: Array<string>
  tags: Array<string>
  externalId: string
  totalNutrients: {}
  totalDaily: {}
  digest: Array<{
    label: string
    tag: string
    schemaOrgTag: string
    total: number
    hasRDI: boolean
    daily: number
    unit: string
    sub: {}
  }>
}

export type LinksItem = {
  self: {
    href: string
    title: string
  }
  next: {
    href: string
    title: string
  }
}
