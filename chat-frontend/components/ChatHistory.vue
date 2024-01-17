<template>
  <h3>get chatHistory:</h3>
  <Btn @click="getChatHistory()"></Btn>
  <div>
    <ul v-if="chatHistory.length > 0">
      <li v-for="message in chatHistory">
        <span>
          {{
            message.attributes.users_permissions_user.data.attributes.username
          }}
        </span>
        <span>
          {{ message.attributes.text }}
        </span>
        <span>
          {{ formatDate(message.attributes.createdAt) }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>

const token = useCookie("token");
const chatHistory = ref([]);
let paginationStart = 0;

const props = defineProps({
  chatRoom: String,
});

const headers = new Headers({
  Authorization: `Bearer ${token.value}`,
});

async function getChatHistory() {
  try {
    const response = await fetch(
      `http://localhost:1337/api/messages?populate=*&filters[chatroom][roomName][$eq]=${props.chatRoom}&sort=createdAt:desc&pagination[start]=${paginationStart}&pagination[limit]=5`,
      {
        headers,
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    //sort the data and update array
    const reversedData = data.data.reverse();
    chatHistory.value = [...reversedData, ...chatHistory.value];
  } catch (e) {
    console.log("Something went wrong with the fetch call!");
    chatHistory.value = "You have to login to get messages";
    console.log(e);
  }
  paginationStart += 5;
}
</script>
