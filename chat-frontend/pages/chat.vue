<template>
  <div class="w-full m-1 sm:w-11/12 md:w-10/12 lg:w-9/12 2xl:w-8/12">
    <div
      class="border shadow-lg rounded-lg w-full p-4"
    >
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
          <h3 class="text-center mb-2">Room: {{ chatRoom }}</h3>
          <div class="border shadow-lg p-3 rounded-lg m-auto sm:w-11/12 md:w-10/12 lg:w-9/12 2xl:w-8/12">
            <ChatHistory
              :chatRoom="chatRoom"
              :timeUserJoinedChat="timeUserJoinedChat"
            />
            <ChatDisplay
              :timeUserJoinedChat="timeUserJoinedChat"
              @updateTime="updateTime"
            />
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
const timeUserJoinedChat = ref("");

const updateTime = (newTime) => {
  timeUserJoinedChat.value = newTime;
};
</script>
