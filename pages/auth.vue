<script setup lang="ts">
useHead({
  title: "Auth"
})

import type { LoginRegisterDTO } from '~/server/typings';
import { useUserStore } from '~/stores/auth';
import type { User } from '~/types';

const router = useRouter();

const userStore = useUserStore();
const isLoading = ref(false);

watch(() => userStore.currentUser, () => {
  if (userStore.currentUser) {
    router.replace("/");
  }
})

const toast = useToast();

const formData = ref<LoginRegisterDTO>({ username: "", password: "" });
const errorMessage = ref("");

async function login() {
  try {
    isLoading.value = true;

    const result = await $fetch(
      "/api/auth/login",
      {
        method: "POST",
        body: {
          username: formData.value.username,
          password: formData.value.password
        }
      });
      console.log(result);
    userStore.setCurrentUser(result as User);
  } catch (e: any) {
    toast.add({ id: "auth-error", title: e.statusMessage })
  } finally {
    isLoading.value = false;
  }
}

async function register() {
  try {
    isLoading.value = true;

    const result = await $fetch(
      "/api/auth/register",
      {
        method: "POST",
        body: {
          username: formData.value.username,
          password: formData.value.password
        }
      });
    userStore.setCurrentUser(result as User);
  } catch (e: any) {
    toast.add({ id: "auth-error", title: e.statusMessage })
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <UContainer class="min-h-[calc(100vh-84px)] flex justify-center items-center">
    <UCard>
      <UForm class="flex flex-col gap-2 items-center" :state="formData" @submit="login">
        Auth
        <UFormGroup label="Username">
          <UInput v-model="formData.username" />
        </UFormGroup>
        <UFormGroup label="Password">
          <UInput v-model="formData.password" type="password" />
        </UFormGroup>
        <UButton label="Login" @click="login" :loading="isLoading" />
        <UButton label="Register" @click="register" :loading="isLoading" />
      </UForm>
      <p class="text-red-500">{{ errorMessage }}</p>
    </UCard>
  </UContainer>
</template>
