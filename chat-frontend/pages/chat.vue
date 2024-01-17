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
        <ChatDisplay :messageArray="messageArray" />
        <MessageInput />
        <UsersInRoom />
      </div>
    </div>
    <ActiveRooms />
  </div>
</template>

<script setup>
import { ref } from "vue";
import JoinChatForm from "~/components/JoinChatForm.vue";
import ChatHistory from "~/components/ChatHistory.vue";

const user = useCookie("user");
const messageArray = ref([]);
const chatRoom = ref("");
const chatRoomActivated = ref(false);
</script>
