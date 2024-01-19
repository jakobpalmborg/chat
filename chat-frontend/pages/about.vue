<template>
  <div class="m-auto w-11/12 sm:w-10/12 md:w-9/12 lg:w-7/12 2xl:w-5/12">
    <h1 class="text-center">About</h1>
    <h3>How to use</h3>
    <p>
      First register an account and you will automatically be redirected to the
      chat page. You kan join a chat room or create a new room. Just write the
      room name and you will enter the room. You can see what rooms are active
      and who is in the same room as you. It is possible to load chat history
      from a previous conversation in a certain room.
    </p>
    <h3 class="mt-4">Tech</h3>
    <p>
      The frontend is build with Nuxt and Tailwind and the backend is build with
      Strapi and Postgres. Socket IO is used for the chat functionality with the
      client in Nuxt and server in Strapi.
    </p>
    <div class="flex justify-around mt-4">
      <IconsNuxt class="text-2xl" />
      <IconsTailwind class="text-2xl" />
      <IconsStrapi class="text-2xl" />
      <IconsPostgres class="text-2xl" />
      <IconsSocketIo class="text-2xl" />
    </div>
  </div>
</template>
