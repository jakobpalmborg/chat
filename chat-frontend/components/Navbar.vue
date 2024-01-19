<template>
  <li
    v-for="link in menuLinks"
    :key="link.id"
    class="hover:opacity-85 md:block"
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
</template>

<script setup>
const menuLinks = ref([
  { id: "index", text: "Home" },
  { id: "chat", text: "Chat" },
  { id: "register", text: "Register" },
  { id: "about", text: "About" },
]);

</script>
