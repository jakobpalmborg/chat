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

      <MessageInput />
      <UsersInRoom />
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
const messageArray = ref([]);
const activity = ref("");
const chatRoom = ref("");
const chatRoomActivated = ref(false);

socket.on("message", (data) => {
  activity.value = "";
  messageArray.value.push(data);
});

socket.on("activity", (name) => {
  activity.value = `${name} is typing...`;
  setTimeout(() => {
    activity.value = "";
  }, 2000);
});
</script>
