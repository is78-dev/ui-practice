<script setup lang="ts">
import { ref } from "vue";

const count = ref<number>(0);
</script>

<template>
  <div>
    <div class="space-y-4">
      <h2 class="text-xl font-semibold">カウンター</h2>
      <div class="text-center text-xl">{{ count }}</div>
      <div class="grid gap-4 grid-cols-3">
        <button @click="count--" class="block p-4 border">-1</button>
        <button @click="count = 0" class="block p-4 border">0</button>
        <button @click="count++" class="block p-4 border">+1</button>
      </div>
    </div>
  </div>
</template>
