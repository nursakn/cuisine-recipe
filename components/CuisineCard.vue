<script setup lang="ts">
const props = defineProps<{
  cuisineType: string,
  link?: string,
}>();

const isLoggedIn = ref(true);
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
            Lvl&nbsp;?
          </p>
        <UProgress class="h-1" :value="20" />
      </div>
    </div>
  </UCard>
</template>