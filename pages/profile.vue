<script setup lang="ts">
import type { Favorite } from '~/types';

const userStore = useUserStore();
const router = useRouter();

const favorites = ref<Favorite[]>([]);
const favoritesLoading = ref(false);
const totalExp = ref(0);

onMounted(async () => {
  favoritesLoading.value = true;
  favorites.value = await $fetch("/api/recipes/favorites/get-by-user", { method: "POST", body: { userId: userStore.currentUser.id } });
  totalExp.value = await $fetch("/api/recipes/experience/count", { method: "POST", body: { userId: userStore.currentUser.id } });
  favoritesLoading.value = false;
})

watch(() => userStore.currentUser, () => {
  if (!userStore.currentUser) {
    router.replace("/auth");
  }
})

const level = computed(() => Math.floor(totalExp.value / 1000));

function logout() {
  userStore.logout();
  router.replace("/")
}

useHead({
  title: "Profile"
})
</script>

<template>
  <UContainer class="py-4">
    <p class="text-xl font-medium text-center mb-4">
      Level: {{ level + 1 }}
    </p>
    <UProgress class="mb-4" :value="(totalExp - level * 1000) / 10" />
    Exp for next level: {{ ((level + 1) * 1000 - totalExp) }}
    <UDivider class="mb-4 mt-4" />
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
    <UButton label="logout" @click="logout" />
  </UContainer>
</template>