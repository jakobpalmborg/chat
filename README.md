# chat

## Postgres database Docker
 docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=password -d -v postgres:/var/lib/postgres postgres

- CREATE USER postgres WITH PASSWORD 'password';
- CREATE DATABASE postgres;
- GRANT ALL PRIVILEGES ON DATABASE postgres TO postgres;

## Strapi
- cd chat-backend
- yarn install
- yarn develop

## Nuxt
- cd chat-frontend
- yarn install
- yarn run dev


 
