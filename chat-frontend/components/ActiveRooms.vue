<template>
  <div class="bg-black text-white p-4 m-4 rounded-lg shadow-lg text-center">
    <h4 class="mt-2">Active rooms:</h4>
    <ul>
      <li v-for="room in roomList">{{ room }}</li>
    </ul>
  </div>
</template>

<script setup>
import { socket } from "../services/socketio.service";
const roomList = ref();

socket.on("roomList", ({ rooms }) => {
  showRooms(rooms);
});

function showRooms(rooms) {
  if (rooms) {
    roomList.value = rooms;
  }
}
</script>
