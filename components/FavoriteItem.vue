<script setup lang="ts">
import { useUserStore } from '~/stores/auth';
import { defineProps } from "vue";

const props = defineProps<{
  recipeId: string;
}>();

const userStore = useUserStore();

const isActive = ref(false);
const isLoading = ref(false);

const iconName = computed(() => isActive.value ? "i-heroicons-heart-solid" : "i-heroicons-heart")

onMounted(async () => {
  fetchActivity();
});

async function fetchActivity() {
  isLoading.value = true;

  isActive.value = await $fetch("/api/recipes/favorites/check", { method: "POST", body: { userId: userStore.currentUser.id, recipeId: props.recipeId } })

  isLoading.value = false;
}

async function onClick() {
  isLoading.value = true;

  if (isActive.value) {
    await $fetch("/api/recipes/favorites/delete", { method: "POST", body: { userId: userStore.currentUser.id, recipeId: props.recipeId } })
  } else {
    await $fetch("/api/recipes/favorites/add", { method: "POST", body: { userId: userStore.currentUser.id, recipeId: props.recipeId } })
  }

  await fetchActivity();

  isLoading.value = false;
}
</script>

<template>
  <UButton :class="{ 'animate-pulse': isLoading }" variant="ghost" @click="onClick">
    <UIcon class="text-3xl text-red-600" :name="iconName" />
  </UButton>
</template>