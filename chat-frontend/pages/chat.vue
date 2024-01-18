<template>
  <div>
    <div class="border shadow-lg rounded-lg p-6">
      <h1 v-if="!chatRoomActivated" class="text-center">Chat</h1>
      <MessageForUserNotLoggedIn v-if="user == '' || user == undefined" />
      <div v-else>
        <JoinChatForm
          v-if="!chatRoomActivated"
          :chatRoom="chatRoom"
          :chatRoomActivated="chatRoomActivated"
          @updateChatRoomActivated="chatRoomActivated = $event"
          @updateChatRoom="chatRoom = $event"
        />
        <div v-else>
          <h3>Room: {{ chatRoom }}</h3>
          <div class="border shadow-lg p-3 rounded-lg m-3">
            <ChatHistory :chatRoom="chatRoom" />
            <ChatDisplay />
          </div>
          <MessageInput />
          <UsersInRoom />
        </div>
      </div>
    </div>
    <ActiveRooms />
  </div>
</template>

<script setup>
const user = useCookie("user");
const chatRoom = ref("");
const chatRoomActivated = ref(false);
</script>
