<template>
  <div class="bg-white dark:bg-gray-950 scheme-light dark:scheme-dark h-full w-full">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>


<script setup lang="ts">

let colorMode = useColorMode();

useHead({
  htmlAttrs: {
    class: `h-full bg-white dark:bg-gray-900`
  }
})
</script>
