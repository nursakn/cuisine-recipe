<script setup lang="ts">
import type { FiltersObject } from '~/server/typings';

const props = defineProps<{
  filters: FiltersObject
}>();

const { data } = await useAsyncData(
  "recipes-list",
  () =>
    $fetch(
      `/api/recipes/list`,
      { query: props.filters }
    )
);
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <RecipeCard
      v-for="(item, index) in data?.hits"
      :key="index"
      :recipe="item.recipe"
      :links="item._links"
    />
  </div>
</template>