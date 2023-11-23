<script setup lang="ts">
import type { PutBlobResult } from '@vercel/blob';
import { upload } from '@vercel/blob/client';
import type { HitItem } from '~/server/typings';
import { getRecipeIdFromUrl } from "~/utils/get-id";
import { useUserStore } from '~/stores/auth';

const props = defineProps<{
  id: string;
}>();

const userStore = useUserStore();
const toast = useToast();
const fileEl = ref<{ input: HTMLInputElement }>();
const blob = ref<PutBlobResult>();

const { data } = await useAsyncData<HitItem>(`recipe-${props.id}`, () => $fetch(`/api/recipes/${props.id}`));

const recipe = computed(() => data.value?.recipe);
const links = computed(() => data.value?._links);

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

const ingredientItems = computed(() => data.value?.recipe.ingredients.map((item) => (
  {
    name: item.food,
    quantity: `${item.quantity} ${item.measure === "<unit>" ? "" : item.measure}`,
    weight: item.weight,
  }
)) ?? []);

const imageAspectRatio = computed(() => 1)

const isFileUploading = ref(false);

const cookingAdded = ref(false);

async function onUpload() {
  isFileUploading.value = true;

  await $fetch("/api/recipes/cooking/add", { method: "POST", body: { userId: userStore.currentUser.id, recipeId: props.id, imageUrl: recipe.value?.cuisineType } });
  cookingAdded.value = true;
  toast.add({ title: "Congratulations", description: "You have earned 250XP for cooking dish" });
  // if (!fileEl.value || fileEl.value?.input.files === null) {
  //   return;
  // }

  // if (fileEl.value.input.files.length === 0) {
  //   toast.add({ title: "Add image of your dish" });
  //   isFileUploading.value = false;
  //   return;
  // }

  // const file = fileEl.value.input.files[0];

  // try {
  //   console.log(file);
  //   const response = await $fetch(
  //     `/api/upload-file`,
  //     {
  //       method: 'POST',
  //       body: { file: file },
  //     },
  //   );

  //   const newBlob = (await response.json()) as PutBlobResult;
  //   blob.value = newBlob;

  //   await $fetch("/api/recipes/cooking/add", { method: "POST", body: {
  //     userId: userStore.currentUser.id,
  //     recipeId: props.id,
  //     imageUrl: blob.value.url,
  //   }})

  //   toast.add({ title: "You added your image" });
  // } catch (e) {
  //   toast.add({ title: "Error occured while uploading image" });
  //   console.log(e);
  // } finally {
  //   isFileUploading.value = false;
  // }

  isFileUploading.value = false;
}
</script>

<template>
  <div class="pt-4 pb-20" v-if="recipe && links">
    <NuxtImg :class="`max-w-[300px] w-full pb-[${(imageAspectRatio * 100).toFixed(0)}]`" :src="recipe.image" :width="300" :height="300" />
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-4xl font-semibold">
        {{ recipe.label }}
      </h1>
      <FavoriteItem :recipe-id="getRecipeIdFromUrl(links)" />
    </div>
    <p class="mb-4">
      <span class="text-2xl font-medium">
        {{ Math.round(recipe.calories) }}
      </span>
      kcal
    </p>
    <UAccordion class="mb-8" :items="accordionItems" multiple>
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
    <h2 class="text-lg font-bold">Ingredients:</h2>
    <UTable class="mb-10" :rows="ingredientItems" />
    <!-- <UInput ref="fileEl" type="file" :disabled="isFileUploading" /> -->

    <UButton size="xl" block label="I cooked it!" @click="onUpload" :disabled="cookingAdded" :loading="isFileUploading" />
  </div>
</template>