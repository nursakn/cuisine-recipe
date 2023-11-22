<script setup lang="ts">
import { CuisineTypes } from "~/shared/filters"
const cuisineTypes = Object.entries(CuisineTypes).map(item => item[1]);
</script>

<template>
  <UContainer class="flex flex-col p-0 gap-4">
    <CuisineCard v-for="cuisineType in cuisineTypes" :cuisine-type="cuisineType" />
  </UContainer>
</template>