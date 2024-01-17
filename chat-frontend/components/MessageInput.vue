<template>
  <form @submit.prevent="sendMessage" class="flex flex-col">
    <textarea
      v-model="messageInput"
      @keydown="onKeyActivity"
      name="textMsg"
      id="textMsg"
      cols="45"
      rows="3"
      class="bg-slate-200 mb-1"
      placeholder="start typing..."
      required
    ></textarea>
    <Btn />
  </form>
</template>

<script setup>
import { ref } from "vue";
import { socket } from "../services/socketio.service";
const user = useCookie("user");

const messageInput = ref("");

function sendMessage() {
  if (messageInput.value)
    socket.emit("message", {
      name: user.value,
      text: messageInput.value,
    });
  messageInput.value = "";
  textMsg.focus();
}

function onKeyActivity() {
  socket.emit("activity", user.value);
}
</script>
