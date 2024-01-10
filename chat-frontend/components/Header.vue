<template>
  <div class="h-32 bg-slate-400">
    <nuxt-link class="flex" to="/">
      <IconsChat />
      <p class="mt-3">chatapp</p>
    </nuxt-link>

    <ul>
      <li class="flex justify-evenly">
        <nuxt-link to="/">Home</nuxt-link>
        <nuxt-link to="/chat">Chat</nuxt-link>

        <nuxt-link v-if="user == '' || user == undefined" to="/login"
          >Login</nuxt-link
        >
        <nuxt-link v-else to="/" @click="clearCookies()">Logout</nuxt-link>

        <nuxt-link to="/register">Register</nuxt-link>
        <nuxt-link to="/about">About</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
const user = useCookie("user");
const token = useCookie("token");
function clearCookies() {
  user.value = "";
  token.value = "";
}
</script>
