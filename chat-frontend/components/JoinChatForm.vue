<template>
  <div>
    <h1>{{ user }}, lets start chat</h1>
    <form @submit.prevent="enterRoom" class="flex flex-col">
      <label for="room">Room:</label>
      <input
        :value="chatRoom"
        @input="updateChatRoom"
        type="text"
        id="room"
        class="bg-slate-200 mb-1"
        required
      />
      <Btn />
    </form>
  </div>
</template>

<script setup>
import { socket } from "../services/socketio.service";

const user = useCookie("user");

const emit = defineEmits(["updateChatRoomActivated", "updateChatRoom"]);

const props = defineProps({
  chatRoomActivated: Boolean,
  chatRoom: String,
});

function enterRoom() {
  if (props.chatRoom) {
    socket.emit("enterRoom", {
      name: user.value,
      room: props.chatRoom,
    });
  }
  emit("updateChatRoomActivated", true);
}

function updateChatRoom(event) {
  emit("updateChatRoom", event.target.value);
}
</script>
