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
      <li
        v-for="link in menuLinks"
        :key="link.id"
        class="hover:opacity-85"
        :class="
          $route.name === link.id
            ? 'underline decoration-solid underline-offset-8'
            : ''
        "
      >
        <nuxt-link v-if="link.id === 'index'" to="/">Home</nuxt-link>
        <nuxt-link v-else :to="link.id">
          {{ link.text }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
const user = useCookie("user");
const token = useCookie("token");
const test = ref(["HEJ"]);

const menuLinks = ref([
  { id: "index", text: "Home" },
  { id: "chat", text: "Chat" },
  { id: "register", text: "Register" },
  { id: "about", text: "About" },
]);

function clearCookies() {
  user.value = "";
  token.value = "";
}
</script>
