<script setup lang="ts">
const props = defineProps<{
  cuisineType: string,
  link?: string,
}>();

const userStore = useUserStore();

const isLoggedIn = computed(() => userStore.isLoggedIn);

const isLoading = ref(false);
const totalExp = ref(0);

onMounted(async () => {
  isLoading.value = true;
  totalExp.value = await $fetch("/api/recipes/experience/count-by-cuisine", { method: "POST", body: { userId: userStore.currentUser.id, cuisineType: props.cuisineType } });
  isLoading.value = false;
})

const level = computed(() => Math.floor(totalExp.value / 1000));
</script>

<template>
  <UCard>
    <div class="flex flex-col gap-2">
      <div class="flex flex-row justify-between items-center">
        <p class="text-xl">{{ cuisineType.charAt(0).toUpperCase() }}{{ cuisineType.slice(1) }}</p>
        <UButton as="a" :to="`/cuisine/${cuisineType}`">Open</UButton>
      </div>
      <UTooltip v-if="!isLoggedIn" text="Log in to see your progress" class="flex gap-2 items-center">
        <p class="text-sm opacity-20">
          Lvl&nbsp;?
        </p>
        <UProgress class="h-1 opacity-20" :value="20" />
      </UTooltip>
      <div v-else class="flex gap-2 items-center">
        <p class="text-sm">
            Lvl&nbsp;{{ level + 1 }}
          </p>
        <UProgress class="h-1" :value="(totalExp - level * 1000) / 10" />
      </div>
    </div>
  </UCard>
</template>