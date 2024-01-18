<template>
  <div class="h-32 bg-black text-white p-3">
    <div class="flex justify-between">
      <nuxt-link class="flex hover:opacity-85" to="/">
        <IconsChat />
        <p class="mt-3 text-2xl lg:text-3xl font-bold">chatapp</p>
      </nuxt-link>
      <button
        class="font-bold text-center bg-blue-700 rounded-lg w-32 h-10 align-bottom"
        v-if="user == '' || user == undefined"
      >
        <nuxt-link to="/login">Login</nuxt-link>
      </button>
      <button
        v-else
        class="font-bold text-center bg-blue-700 rounded-lg w-32 h-10 align-middle"
        to="/"
        @click="clearCookies()"
      >
        <nuxt-link>Logout</nuxt-link>
      </button>
    </div>
    <ul class="flex justify-evenly text-white text-2xl lg:text-3xl font-bold">
      <Navbar />
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
