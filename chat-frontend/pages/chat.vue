<template>
  <div>
    <div v-if="user == '' || user == undefined">
      <p class="block">
        <nuxt-link to="/login">LOGIN</nuxt-link> or
        <nuxt-link to="/register">REGISTER</nuxt-link> an account to start chat.
      </p>
    </div>

    <div v-else>
      <h1>{{ user }}, lets start chat</h1>
      <form class="flex flex-col" action="">
        <label for="room">Room:</label>
        <input type="text" id="room" class="bg-slate-200 mb-1" />
        <Btn />
        <div></div>
      </form>

      <h1>Chat room name</h1>
      <ul>
        <li v-for="message in messageArray">{{ message }}</li>
      </ul>
      <form @submit.prevent="sendMessage" class="flex flex-col">
        <textarea
          v-model="message"
          name="textMsg"
          id="textMsg"
          cols="45"
          rows="3"
          class="bg-slate-200 mb-1"
          placeholder="start typing..."
        ></textarea>
        <Btn />
      </form>
    </div>

    <h3 class="mt-10">get chatHistory(not implemented):</h3>
    <Btn @click="getMessage()"></Btn>
    <div>{{ chatHistory }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { io } from "socket.io-client";

const user = useCookie("user");
const token = useCookie("token");
const message = ref("");
const messageArray = ref([]);
const chatHistory = ref("");
const socket = io("ws://localhost:1337");

function sendMessage() {
  console.log(message.value);

  socket.emit("message", message.value);
  message.value = "";
}

socket.on("message", (data) => {
  messageArray.value.push(data);
});

const headers = new Headers({
  Authorization: `Bearer ${token.value}`,
});

async function getMessage() {
  try {
    const response = await fetch("http://localhost:1337/api/messages", {
      headers,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    chatHistory.value = data.data;
  } catch (e) {
    console.log("Something went wrong with the fetch call!");
    chatHistory.value = "You have to login to get messages";
    console.log(e);
  }
}
</script>
