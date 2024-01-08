<template>
  <div>
    <div v-if="user == ''">
      <p class="block">
        <nuxt-link to="/login">LOGIN</nuxt-link> or
        <nuxt-link to="/register">REGISTER</nuxt-link> an account to start chat.
      </p>
    </div>

    <div v-else>
      <h1>{{ user }}, lets start chat</h1>
      <form class="flex flex-col" action="">
        <label for="room">Room:</label>
        <input type="text" id="room" class="bg-slate-200 mb-1" />
        <Btn />
        <div></div>
      </form>

      <h1>Chat room name</h1>
      <ul>
        <li>chat message</li>
        <li>chat message</li>
        <li>chat message</li>
      </ul>
      <form action="" class="flex flex-col">
        <textarea
          name="textMsg"
          id="textMsg"
          cols="45"
          rows="3"
          class="bg-slate-200 mb-1"
          placeholder="start typing..."
        ></textarea>
        <Btn />
      </form>
    </div>
  </div>
</template>

<script setup>
const user = useCookie("user");
</script>
