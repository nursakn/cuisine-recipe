<template>
  <UContainer>
    <p>{{ $route.params.type }}</p>
    <Suspense>
      <RecipeGrid :filters="{ cuisineType: $route.params.type }" />
      <template #fallback>
        <RecipeGridLoading />
      </template>
    </Suspense>
  </UContainer>
</template>