<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  }
})
const { signIn } = useAuth()
</script>

<template>
  <div>
    <p>Sign-In Options:</p>
    <!-- NOTE: Here we hard-coded username and password, on your own page this should probably be connected to two inputs for username + password -->
    <button @click="signIn('credentials', { username: 'test', password: 'hunter2' })">Username and Password</button>
  </div>
</template>
