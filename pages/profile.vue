<script setup lang="ts">
import type { Favorite } from '~/types';

const userStore = useUserStore();

const favorites = ref<Favorite[]>([]);
const favoritesLoading = ref(false);

onMounted(async () => {
  favoritesLoading.value = true;
  favorites.value = await $fetch("/api/recipes/favorites/get-by-user", { method: "POST", body: { userId: userStore.currentUser.id } });
  console.log(favorites.value);
  favoritesLoading.value = false;
})
</script>

<template>
  <UContainer class="py-4">
    <div>
      <h2 class="text-3xl mb-4">Favorites</h2>
      <p v-if="favoritesLoading">loading</p>
      <div class="flex flex-col gap-3" v-else-if="favorites.length > 0">
        <UCard v-for="favorite in favorites">
          <div class="flex justify-between">
            <p>{{ favorite.recipeid }}</p>
            <UButton :to="`/recipes/${favorite.recipeid}`" label="open" />
          </div>
        </UCard>
      </div>
      <p v-else>You don't have favorites yet</p>
    </div>
  </UContainer>
</template>