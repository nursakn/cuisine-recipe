<script setup lang="ts">
import type { UCard, UButton } from "#ui-colors/components";
import type { LinksItem, RecipeItem } from "~/server/typings";
import { getRecipeIdFromUrl } from "~/utils/get-id";

const props = defineProps<{
  recipe: RecipeItem;
  links: LinksItem;
}>();

const link = computed(() => {
  return `/recipes/${getRecipeIdFromUrl(props.links)}`;
});
</script>

<template>
  <UCard class="flex flex-col" :ui="{ header: { padding: 'p-0 sm:p-0' }, body: { base: 'h-full' } }">
    <template #header>
      <NuxtImg class="w-full" :src="recipe.image" width="150" height="150" />
    </template>
    <template #default>
      <div class="flex flex-col w-full h-full justify-between">
        <div>
          <div class="flex justify-between gap-2">
            <div class="flex flex-wrap">
              <UBadge v-for="(type, index) in recipe.dishType" :key="type">
                {{ type }}
              </UBadge>
            </div>
            <FavoriteItem :recipe-id="getRecipeIdFromUrl(links)" />
          </div>
          <p>
            {{ recipe.externalId }}
          </p>
          <p class="text-lg font-bold mb-2">{{ recipe.label }}</p>
          <p class="text-xs mb-4">
            <span class="text-2xl">
              {{ Math.round(recipe.calories) }} 
            </span>
            kcal
          </p>
        </div>
        <UButton
          class="w-full flex justify-center items-center"
          :to="link"
          trailing-icon="i-heroicons-arrow-long-right"
          block
          size="xl"
          label="Cook"
        />
      </div>
    </template>
  </UCard>
</template>
