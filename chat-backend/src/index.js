 'use strict';


module.exports = {
  
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {

    const ADMIN = "admin";

    // TODO save state in database?
    const UsersState = {
      users: [],
      setUsers: function(newUsersArray) {
        this.users = newUsersArray
      }
    }
    
    // @ts-ignore
    var io = require("socket.io")(strapi.server.httpServer, {
      cors: {
        origin: process.env.NODE_ENV === "production" ? ["https://chat-sand-pi.vercel.app/"] : ["http://localhost:3000", "http://127.0.0.1:3000"]
      }

    });

    io.on('connection', socket => {
      console.log(`User ${socket.id} connected`)
    
      // to user when connecting
      socket.emit('message', buildMsg(ADMIN, "Welcome to chatapp!"))
      
      socket.on('enterRoom', ({name, room}) => {
        
        //Leave previous room
        const prevRoom = getUser(socket.id)?.room
        
        if (prevRoom) {
          socket.leave(prevRoom)
          io.to(prevRoom).emit('message', buildMsg(ADMIN, `${name} has left the room`))
        }

        const user = activateUser(socket.id, name, room)

        if(prevRoom) {
          io.to(prevRoom).emit('userList', {
            users: getUsersInRoom(prevRoom)
          })
        }

        // join room
        socket.join(user.room)

        // To user who joined
        socket.emit('message', buildMsg(ADMIN, `You have joined the ${user.room} chat room`))

        // To everyone else
        socket.broadcast.to(user.room).emit('message', buildMsg(ADMIN, `${user.name} has joined the room`))

        //Update user list for room
        io.to(user.room).emit('userList', {
          users: getUsersInRoom(user.room)
        })

        //update rooms list for everyone
        io.emit('roomList', {
          rooms: getAllActiveRooms()
        })
        
        saveRoom(room);
        
      })

       //when user disconnects to all others
       socket.on('disconnect', () => {
        const user = getUser(socket.id)
        userLeavesApp(socket.id)
        
        if (user) {
          io.to(user.room).emit('message', buildMsg(ADMIN, `${user.name} has left the room`))
        
          io.to(user.room).emit('userList', {
            users: getUsersInRoom(user.room)          
          })

          io.emit('roomList', {
            rooms: getAllActiveRooms()
          })
        }
          
        console.log(`User ${socket.id} disconnected`)
      })

      // listening for message event
      socket.on('message', ({name, text}) => {
        
        const room = getUser(socket.id)?.room
        if (room) {
          io.to(room).emit('message', buildMsg(name, text))
        }
        saveMessage(name, text, room)
      })

      // listen for activity
      socket.on('activity', (name) => {
        const room = getUser(socket.id)?.room
        if(room) {
          socket.broadcast.to(room).emit('activity', name)
        }
      })
    })

    // functions for sockets
    function buildMsg(name, text) {
      return{
        name,
        text,
        time: new Date(Date.now())
      }
    }

    function activateUser(id, name, room) {
      const user = { id, name, room}
      UsersState.setUsers([
        ...UsersState.users.filter(user => user.id !== id),
        user
      ])
      return user
    }

    function userLeavesApp(id) {
      UsersState.setUsers(
        UsersState.users.filter(user => user.id !== id)
      )
    }

    function getUser(id) {
      return UsersState.users.find(user => user.id === id)
    }

    function getUsersInRoom(room) {
      return UsersState.users.filter(user => user.room === room)
      }

    function getAllActiveRooms() {
      const activeRoomsArray = Array.from(new Set(UsersState.users.map(user => user.room)))
      return activeRoomsArray
      }

    async function saveMessage(name, text, room) {
      // get user id
      const user = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: { username: name }
      })
      
      // get room id
      let roomInDatabase 
      roomInDatabase = await strapi.db.query("api::chatroom.chatroom").findMany({where: { 
        roomName: room
      }})
      const roomId = parseInt(roomInDatabase[0].id)
      
      // save message
      const entry = await strapi.entityService.create("api::message.message",  {
        data: {
          text: text,
          chatroom: {connect: [roomId]
            },
            users_permissions_user: {connect: [user.id]
          },
          type: "userMsg"
          }
        })
    
      }

      async function saveRoom(room) {
        // check if room is in database
        let roomInDatabase = "" 
        roomInDatabase = await strapi.db.query("api::chatroom.chatroom").findMany({where: { 
          roomName: room
        }})

        // if room is not in database, add room
        if(roomInDatabase == "") {
        await strapi.entityService.create("api::chatroom.chatroom", {
          data: {
            roomName: room
          }
        })
       }

    }

  },
};
