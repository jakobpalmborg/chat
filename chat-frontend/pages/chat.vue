<template>
  <div>
    <!-- message for users NOT logged in -->
    <div v-if="user == '' || user == undefined">
      <p class="block">
        <nuxt-link to="/login">LOGIN</nuxt-link> or
        <nuxt-link to="/register">REGISTER</nuxt-link> an account to start chat.
      </p>
    </div>

    <!-- form for joining chat -->
    <div v-else>
      <div v-if="!chatRoomActivated">
        <h1>{{ user }}, lets start chat</h1>
        <form @submit.prevent="enterRoom" class="flex flex-col">
          <label for="room">Room:</label>
          <input
            v-model="chatRoom"
            type="text"
            id="room"
            class="bg-slate-200 mb-1"
            required
          />
          <Btn />
        </form>
      </div>

      <!-- the Chat -->
      <div v-else>
        <h1>Room: {{ chatRoom }}</h1>
        <ul>
          <li v-for="message in messageArray">{{ message }}</li>
        </ul>
        <p class="activity">activity: {{ activity }}</p>
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
        <h2>Users in room:</h2>
        <ul>
          <li v-for="user in userList">{{ user.name }}</li>
        </ul>
      </div>
      <h2>Active rooms:</h2>
      <ul>
        <li v-for="room in roomList">{{ room }}</li>
      </ul>
    </div>

    <!-- to get chat history -->
    <!-- <h3 class="mt-10">get chatHistory(not implemented):</h3>
        <Btn @click="getMessage()"></Btn>
        <div>{{ chatHistory }}</div> -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import { socket } from "../services/socketio.service";

const user = useCookie("user");
const token = useCookie("token");
const messageInput = ref("");
const messageArray = ref([]);
const chatHistory = ref("");
const activity = ref("");
const chatRoom = ref("");
const userList = ref();
const roomList = ref();
const chatRoomActivated = ref(false);

function sendMessage() {
  if (messageInput.value)
    socket.emit("message", {
      name: user.value,
      text: messageInput.value,
    });
  messageInput.value = "";
  textMsg.focus();
}

function enterRoom() {
  messageArray.value = [];
  if (chatRoom.value) {
    socket.emit("enterRoom", {
      name: user.value,
      room: chatRoom.value,
    });
  }
  chatRoomActivated.value = true;
}

socket.on("message", (data) => {
  activity.value = "";
  messageArray.value.push(data);
});

function onKeyActivity() {
  socket.emit("activity", user.value);
}

socket.on("activity", (name) => {
  activity.value = `${name} is typing...`;
  setTimeout(() => {
    activity.value = "";
  }, 2000);
});

socket.on("userList", ({ users }) => {
  showUsers(users);
});

socket.on("roomList", ({ rooms }) => {
  showRooms(rooms);
});

function showUsers(users) {
  if (users) {
    userList.value = users;
  }
}

function showRooms(rooms) {
   if (rooms) {
    roomList.value = rooms;
  }
}

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
