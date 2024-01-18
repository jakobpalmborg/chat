<template>
  <div>
    <h1 class="text-center">Chat</h1>
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
        <h1>Room: {{ chatRoom }}</h1>
        <ChatHistory :chatRoom="chatRoom" />
        <ChatDisplay />
        <MessageInput />
        <UsersInRoom />
      </div>
      <ActiveRooms />
    </div>
    
  </div>
</template>

<script setup>
const user = useCookie("user");
const chatRoom = ref("");
const chatRoomActivated = ref(false);
</script>
