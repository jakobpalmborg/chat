<template>
  <div class="text-center">
    <h4>Users in room:</h4>
    <ul>
      <li v-for="user in userList">{{ user.name }}</li>
    </ul>
  </div>
</template>

<script setup>
import { socket } from "../services/socketio.service";

const userList = ref();

socket.on("userList", ({ users }) => {
  showUsers(users);
});

function showUsers(users) {
  if (users) {
    userList.value = users;
  }
}
</script>
