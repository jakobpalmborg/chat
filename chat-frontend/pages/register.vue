<template>
  <div>
    <h1>Create Account</h1>
    <form @submit.prevent="onRegister" class="flex flex-col">
      <label for="username">User Name:</label>
      <input
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

async function onRegister() {
  const payload = {
    username: username.value,
    email: email.value,
    password: password.value,
  };

  const headers = new Headers({ "content-type": "application/json" });

  try {
    const response = await fetch(
      "http://localhost:1337/api/auth/local/register",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    token.value = data.jwt;
    user.value = data.user.username;
    navigateTo('/chat');
    
  } catch (e) {
    console.log("Something went wrong with the fetch call!");
    console.log(e);
  }
}
</script>
