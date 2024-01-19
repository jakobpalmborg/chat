<template>
  <div class="text-center">
    <Btn text="^ more messages ^" @click="getChatHistory()"></Btn>
  </div>
  <div>
    <ul v-if="chatHistory.length > 0">
      <li
        v-for="message in chatHistory"
        class="p-2 rounded-2xl mt-4 overflow-auto"
        :class="
          message.attributes.users_permissions_user.data.attributes.username ===
          user
            ? 'ml-10 border border-solid border-gray-400 shadow-lg'
            : message.name !== 'admin'
            ? 'mr-10 border border-gray-400 shadow-lg'
            : ''
        "
      >
        <div class="flex justify-between text-s">
          
          <span class="font-bold"
            :class="
              message.attributes.users_permissions_user.data.attributes
                .username === user
                ? 'bg-green-700 text-white pt-1 pr-2 pb-1 pl-2 rounded-full '
                : 'bg-purple-700   text-white pt-1 pr-2 pb-1 pl-2 rounded-full'
            "
          >
            {{
              message.attributes.users_permissions_user.data.attributes.username
            }}
          </span>
          <span class="text-xs">
            {{ formatDate(message.attributes.createdAt) }}
          </span>
        </div>
        <span>
          {{ message.attributes.text }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
const token = useCookie("token");
const user = useCookie("user");

const chatHistory = ref([]);
let paginationStart = 0;

const props = defineProps({
  chatRoom: String,
  timeUserJoinedChat: String,
});

const headers = new Headers({
  Authorization: `Bearer ${token.value}`,
});

async function getChatHistory() {
  try {
    const response = await fetch(
      `http://localhost:1337/api/messages?populate=*&filters[chatroom][roomName][$eq]=${props.chatRoom}&filters[createdAt][$lt]=${props.timeUserJoinedChat}&sort=createdAt:desc&pagination[start]=${paginationStart}&pagination[limit]=5`,
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
