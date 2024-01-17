<template>
  <div>
    <form @submit.prevent="onRegisterOrLogin" class="flex flex-col">
      <label v-if="$route.name === 'register'" for="username">User Name:</label>
      <input
        v-if="$route.name === 'register'"
        v-model="username"
        type="text"
        required
        id="username"
        class="bg-slate-200"
      />
      <label for="email">Email:</label>
      <input v-model="email" type="email" required class="bg-slate-200" />
      <label for="password">Password:</label>
      <input
        v-model="password"
        type="password"
        required
        class="bg-slate-200 mb-1"
      />
      <Btn />
    </form>
  </div>
</template>

<script setup>
const username = ref("");
const email = ref("");
const password = ref("");
const token = useCookie("token");
const user = useCookie("user");
const route = useRoute();

async function onRegisterOrLogin() {
  let payload;
  if (route.name === "register") {
    payload = {
      username: username.value,
      email: email.value,
      password: password.value,
    };
  } else {
    payload = {
      identifier: email.value,
      password: password.value,
    };
  }

  const headers = new Headers({ "content-type": "application/json" });

  let url;
  if (route.name === "register") {
    url = "http://localhost:1337/api/auth/local/register";
  } else {
    url = "http://localhost:1337/api/auth/local";
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    token.value = data.jwt;
    user.value = data.user.username;
    navigateTo("/chat");
  } catch (e) {
    console.log("Something went wrong with the fetch call!");
    console.log(e);
  }
}
</script>
