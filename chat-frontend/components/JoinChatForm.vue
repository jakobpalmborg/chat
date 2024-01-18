<template>
  <div>
    <h3>{{ user }},</h3>
    <form @submit.prevent="enterRoom" class="flex flex-col">
      <label for="room">Join or create room:</label>
      <input
        :value="chatRoom"
        @input="updateChatRoom"
        type="text"
        id="room"
        class="mb-3 h-9 border border-black border-t-0 border-l-0 border-r-0 w-72 p-1"
        required
      />
      <Btn text="Join"/>
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
