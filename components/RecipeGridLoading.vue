<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <UCard v-for="i in 8" :key="i" :ui="{ header: { padding: 'p-0 sm:p-0' }, body: { base: 'h-full' } }">
      <template #header>
        <USkeleton class="w-full pb-[100%]" />
      </template>
      <template #default>
        <USkeleton class="w-24 h-6 mb-2" />
        <USkeleton class="w-4/5 h-7 mb-2" />
        <USkeleton class="w-28 h-8 mb-4" />
        <UButton
          class="flex justify-center items-center bg-white"
          size="xl"
          label="Cook"
          block
          disabled
        >
        <template #trailing>
          <UIcon name="i-heroicons-arrow-path" class="animate-spin" />
        </template>
        </UButton>
      </template>
    </UCard>
  </div>
</template>