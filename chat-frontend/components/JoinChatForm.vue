<template>
  <div class="w-10/12 sm:w-8/12 md:w-6/12 lg::w-4/12 text-left m-auto mb-4">
    <h3>{{ user }},</h3>
    <form @submit.prevent="enterRoom" class="flex flex-col">
      <label for="room">Join or create room:</label>
      <input
        :value="chatRoom"
        @input="updateChatRoom"
        type="text"
        id="room"
        class="mb-5 h-9 border border-black border-t-0 border-l-0 border-r-0 p-1 ml-2"
        required
      />
      <Btn text="Join" />
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
