<template>
  <div class="bg-black text-white p-3">
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
    <div class="md:hidden flex flex-row-reverse">
      <button @click="openOrCloseMobileMenu">
        <IconsCross v-if="mobileMenu" class="text-2xl" />
        <IconsHamburger v-else class="text-2xl" />
      </button>
    </div>
    <ul
      class="flex flex-col md:flex-row justify-evenly text-white text-2xl lg:text-3xl font-bold md:flex"
      :class="{ hidden: !mobileMenu }"
    >
      <Navbar />
    </ul>
  </div>
</template>

<script setup>
const user = useCookie("user");
const token = useCookie("token");
const mobileMenu = ref(false);

function clearCookies() {
  user.value = "";
  token.value = "";
}

function openOrCloseMobileMenu() {
  mobileMenu.value = !mobileMenu.value;
  console.log(mobileMenu.value);
}
</script>
