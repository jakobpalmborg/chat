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
  bootstrap(/*{ strapi }*/) {
    
    var io = require("socket.io")(strapi.server.httpServer, {
      cors: {
        origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:3000", "http://127.0.0.1:3000"]
      }

    });
    io.on('connection', socket => {
      console.log(`User ${socket.id} connected`)

      socket.on('message', data => {
        console.log(data)
        io.emit('message', `${socket.id.substring(0, 5)}: ${data}`)
      })
    })
  },
};
