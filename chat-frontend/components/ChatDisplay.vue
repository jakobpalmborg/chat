<template>
  <ul>
    <li
      v-for="message in messageArray"
      class="p-2 rounded-2xl mt-1 overflow-auto"
      :class="
        message.name === user
          ? 'ml-10 bg-green-300  '
          : message.name !== 'admin'
          ? 'mr-10 bg-red-300'
          : 'text-xs  '
      "
    >
      <div class="flex justify-between text-xs">
        <span v-if="message.name != 'admin'">
          {{ message.name }}
        </span>
        <span class="text-right">
          {{ formatDate(message.time) }}
        </span>
      </div>
      <span class="block">
        {{ message.text }}
      </span>
    </li>
  </ul>
  <p class="activity">{{ activity }}</p>
</template>

<script setup>
import { socket } from "../services/socketio.service";
const user = useCookie("user");
const activity = ref("");
const messageArray = ref([]);

const props = defineProps({
  timeUserJoinedChat: String,
});

const emit = defineEmits(["updateTime"]);



socket.on("message", (data) => {
  activity.value = "";
  messageArray.value.push(data);
  emit("updateTime", data.time);
});

socket.on("activity", (name) => {
  activity.value = `${name} is typing...`;
  setTimeout(() => {
    activity.value = "";
  }, 2000);
});
</script>
