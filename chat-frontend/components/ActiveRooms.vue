<template>
  <div>
    <h2>Active rooms:</h2>
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
