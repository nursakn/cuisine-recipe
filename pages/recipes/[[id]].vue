<script setup lang="ts">
useHead({
  title: "Global Culinary Quest | Recipe"
})
</script>

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