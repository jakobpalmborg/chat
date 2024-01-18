<template>
  <button class="bg-blue-700 text-white rounded-md h-10">{{props.text}}</button>
</template>

<script setup>
const props = defineProps({
  text: String,
});
</script>
