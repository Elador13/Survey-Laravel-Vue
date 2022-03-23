<template>
  <router-link
    tag="div"
    class="flex items-center relative p-4 w-full bg-white rounded-lg overflow-hidden shadow hover:shadow-md hover:bg-gray-50 hover:cursor-pointer"
    :to="{ name: 'SurveyResponseView', params: {id: id, respId: respId } }"
  >
    <div class="ml-3">
      <p class="font-medium text-gray-800">{{ name }}</p>
      <p class="text-sm mt-1 text-gray-600">{{ email }}</p>
      <p class="text-sm mt-1 text-gray-400">{{ formattedDate }}</p>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from "vue";

const { name, email, date, respId } = defineProps({
  id: Number,
  name: String,
  surveyTitle: String,
  email: String,
  date: String,
  respId: Number,
});

const formattedDate = computed(() => new Date(date).toLocaleString());
</script>

<style></style>
