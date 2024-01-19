<template>
  <div class="text-center mt-4 mb-4">
    <form @submit.prevent="sendMessage">
      <input
        type="text"
        v-model="messageInput"
        @keydown="onKeyActivity"
        name="textMsg"
        id="textMsg"
        cols="45"
        rows="3"
        class="pl-1 h-10 border border-black border-t-0 border-l-0 border-r-0 w-10/12 mr-2 sm:w-11/12 md:w-10/12 lg:w-9/12 2xl:w-8/12"
        placeholder="start typing..."
        required
      />
      <Btn text=">" class="w-10" />
    </form>
  </div>
</template>

<script setup>
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
