<template>
  <ul>
    <li
      v-for="message in messageArray"
      class="p-2 rounded-2xl mt-4 overflow-auto"
      :class="
        message.name === user
          ? 'ml-10 border border-gray-400 shadow-lg'
          : message.name !== 'admin'
          ? 'mr-10 border border-gray-400 shadow-lg'
          : 'text-xs text-center'
      "
    >
      <div class="flex justify-between text-s">
        <span
          v-if="message.name != 'admin'"
          class="font-bold"
          :class="
            message.name === user
              ? 'bg-green-700 text-white pt-1 pr-2 pb-1 pl-2 rounded-full '
              : 'bg-purple-700   text-white pt-1 pr-2 pb-1 pl-2 rounded-full'
          "
        >
          {{ message.name }}
        </span>
        <span class="text-xs" :class="message.name === 'admin' ? 'm-auto' : ''">
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
