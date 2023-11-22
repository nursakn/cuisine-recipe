<script setup lang="ts">
import type { HitItem } from '~/server/typings';

const props = defineProps<{
  id: string;
}>();

const { data } = await useAsyncData<HitItem>(`recipe-${props.id}`, () => $fetch(`/api/recipes/${props.id}`))

const recipe = computed(() => data.value?.recipe);

const accordionItems = computed(() => [
  {
    label: "Cautions",
    icon: "i-heroicons-exclamation-circle",
    defaultOpen: false,
    slot: "cautions"
  },
  {
    label: "Diet Labels",
    icon: "i-heroicons-information-circle",
    defaultOpen: false,
    slot: "dietLabels",
  },
  {
    label: "Health Labels",
    icon: "i-heroicons-information-circle",
    defaultOpen: false,
    slot: "healthLabels",
  },
])

const imageAspectRatio = computed(() =>
  recipe.value
    ? (recipe.value?.images.LARGE.width / recipe.value?.images.LARGE.height)
    : 1
  )
</script>

<template>
  <div v-if="recipe">
    <NuxtImg :class="`w-full pb-[${(imageAspectRatio * 100).toFixed(0)}]`" :src="recipe.images.LARGE.url" :width="recipe.images.LARGE.width" :height="recipe.images.LARGE.height" />
    <h1 class="text-4xl font-semibold">
      {{ recipe.label }}
    </h1>
    <p>
      <span class="text-2xl font-medium">
        {{ Math.round(recipe.calories) }}
      </span>
      kcal
    </p>
    <UAccordion :items="accordionItems" multiple>
      <template #cautions v-if="recipe.cautions?.length > 0">
        <div class="flex flex-wrap gap-2">
          <UBadge v-for="caution in recipe.cautions">{{ caution }}</UBadge>
        </div>
      </template>
      <template #dietLabels v-if="recipe.dietLabels?.length > 0">
        <div class="flex flex-wrap gap-2" >
          <UBadge v-for="dietLabel in recipe.dietLabels">{{ dietLabel }}</UBadge>
        </div>
      </template>
      <template #healthLabels v-if="recipe.healthLabels?.length > 0">
        <div class="flex flex-wrap gap-2">
          <UBadge v-for="healthLabel in recipe.healthLabels">{{ healthLabel }}</UBadge>
        </div>
      </template>
    </UAccordion>
  </div>
</template>