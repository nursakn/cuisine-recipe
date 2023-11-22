<template>
  <UContainer>
    <Suspense>
      <RecipeView :id="$route.params.id" />
      <template #fallback>
        loading...
      </template>
    </Suspense>
  </UContainer>
</template>