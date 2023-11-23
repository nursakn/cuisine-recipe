import type { User } from "~/types";
import { useStorage } from "@vueuse/core";

export const useUserStore = defineStore('auth', () => {
  const currentUser = useStorage<User>('user', { id: "", username: "" });

  const isLoggedIn = computed(() => currentUser.value.id !== "");

  function logout() {
    currentUser.value = { id: "", username: "" };
  }

  async function setCurrentUser(user: User) {
    currentUser.value = user;
  }

  return {
    currentUser: computed(() => currentUser.value),
    isLoggedIn,
    setCurrentUser,
    logout
  }
});