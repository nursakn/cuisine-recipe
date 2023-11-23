<script setup lang="ts">
const route = useRoute();

useHead({
  title: `Global Culinary Quest | ${route.params.type}`
})

const type = computed<string>(() => typeof(route.params.type) === "string" ? route.params.type : route.params.type[0]);
</script>

<template>
  <UContainer class="py-5">
    <h1 class="text-5xl font-medium mb-10">{{ type.charAt(0).toUpperCase() }}{{ type.slice(1) }}</h1>
    <Suspense>
      <RecipeGrid :filters="{ cuisineType: type }" />
      <template #fallback>
        <RecipeGridLoading />
      </template>
    </Suspense>
  </UContainer>
</template>