var socketIO = require('socket.io');

function initSocketIO(server) {
  // SocketIO server
  var io = socketIO.listen(server);

  // Messages
  io.on('connection', function(socket) {
      // Join a room
      socket.on('join', (data) => {
        if (data.room == null) return;
        socket.join(data.room);
        console.log("Joined " + data.room, data);
      });

      // Send messages to all
      socket.on('message', (data) => {
        if (data.room == null) return;
        io.to(data.room).emit('message', data);
      });

      // Send player details to all
      socket.on('player', (data) => {
        if (data.room == null) return;
        io.to(data.room).emit('player', data);
      });
  });
}

module.exports = initSocketIO;
