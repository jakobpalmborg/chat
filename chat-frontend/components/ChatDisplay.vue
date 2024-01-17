<template>
  <ul>
    <li v-for="message in messageArray">
      {{ message.name }} {{ message.text }}
      {{ formatDate(message.time) }}
    </li>
  </ul>
  <p class="activity">activity: {{ activity }}</p>
</template>

<script setup>
import { ref } from "vue";
import { socket } from "../services/socketio.service";

const activity = ref("");

const { messageArray } = defineProps({
  messageArray: Array,
});

socket.on("message", (data) => {
  activity.value = "";
  messageArray.push(data);
});

socket.on("activity", (name) => {
  activity.value = `${name} is typing...`;
  setTimeout(() => {
    activity.value = "";
  }, 2000);
});
</script>
