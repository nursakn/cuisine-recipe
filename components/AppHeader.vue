<script setup lang="ts">
import { useUserStore } from '~/stores/auth';

const userStore = useUserStore();
</script>

<template>
  <header class="py-5 bg-green-500">
    <UContainer class="justify-between items-center flex">
      <ULink to="/" class="font-bold text-white dark:text-white">FlavorFul</ULink>
      <UButton v-if="userStore.isLoggedIn" class="flex items-center gap-2" to="/profile">
        <UAvatar icon="i-heroicons-user" /> {{ userStore.currentUser.username }}
      </UButton>
      <UButton v-else to="/auth">Login</UButton>
    </UContainer>
  </header>
</template>