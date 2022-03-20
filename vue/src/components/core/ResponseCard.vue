<template>
  <div
    class="flex items-center relative p-4 w-full bg-white rounded-lg overflow-hidden shadow hover:shadow-md hover:bg-gray-50 hover:cursor-pointer"
  >
    <!--      <div class="w-12 h-12 rounded-full bg-gray-100"></div>-->
    <div class="ml-3">
      <p class="font-medium text-gray-800">{{ name }}</p>
      <p class="text-sm mt-1 text-gray-600">{{ email }}</p>
      <p class="text-sm mt-1 text-gray-400">{{ formattedDate }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const { name, email, date } = defineProps({
  name: String,
  email: String,
  date: String,
});

const formattedDate = computed(() => new Date(date).toLocaleString());
</script>

<style></style>
