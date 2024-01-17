<template>
  <h2>Users in room:</h2>
  <ul>
    <li v-for="user in userList">{{ user.name }}</li>
  </ul>
</template>

<script setup>
import { ref } from "vue";
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
