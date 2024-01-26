# chat

## About
This is a fullstack chat application build with Nuxt, Tailwind, Strapi, Postgres and SocketIO.

## Deployed

### Frontend
https://chat-sand-pi.vercel.app/
### Backend
https://chat-8tjg.onrender.com/

## How to use
First register an account and you will automatically be redirected to the chat page. You kan join a chat room or create a new room, just write the room name and you will enter the room. You can see what rooms are active and who is in the same room as you. You see when someone in the room is writing and you get notifications about events like someone joining or leaving room. It is possible to load chat history from a previous conversation in a certain room.

## Run locally
### Postgres database Docker
 docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=password -d -v postgres:/var/lib/postgres postgres

- CREATE USER postgres WITH PASSWORD 'password';
- CREATE DATABASE postgres;
- GRANT ALL PRIVILEGES ON DATABASE postgres TO postgres;

### Strapi
- cd chat-backend
- yarn install
- yarn develop

### Nuxt
- cd chat-frontend
- echo STRAPI_URL=http://localhost:1337 >> .env
- echo STRAPI_WS=ws://localhost:1337 >> .env
- yarn install
- yarn run dev
