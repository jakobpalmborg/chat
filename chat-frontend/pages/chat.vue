<template>
  <div>
    <MessageForUserNotLoggedIn v-if="user == '' || user == undefined" />

    <div v-else>
      <JoinChatForm
        v-if="!chatRoomActivated"
        :chatRoom="chatRoom"
        :chatRoomActivated="chatRoomActivated"
        :messageArray="messageArray"
        @updateChatRoomActivated="chatRoomActivated = $event"
        @updateChatRoom="chatRoom = $event"
      />

      <!-- the Chat -->
      <div v-else>
        <h1>Room: {{ chatRoom }}</h1>

        <ChatHistory :chatRoom="chatRoom" />

        <!-- Chat display -->
      </div>
      <ul>
        <li v-for="message in messageArray">
          {{ message.name }} {{ message.text }}
          {{ formatDate(message.time) }}
        </li>
      </ul>
      <p class="activity">activity: {{ activity }}</p>

      <!-- chat input -->
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

      <!-- information -->
      <h2>Users in room:</h2>
      <ul>
        <li v-for="user in userList">{{ user.name }}</li>
      </ul>
    </div>
    <ActiveRooms />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { socket } from "../services/socketio.service";
import JoinChatForm from "~/components/JoinChatForm.vue";
import ChatHistory from "~/components/ChatHistory.vue";

const user = useCookie("user");

const messageInput = ref("");
const messageArray = ref([]);

const activity = ref("");
const chatRoom = ref("");
const userList = ref();

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

function showUsers(users) {
  if (users) {
    userList.value = users;
  }
}
</script>
