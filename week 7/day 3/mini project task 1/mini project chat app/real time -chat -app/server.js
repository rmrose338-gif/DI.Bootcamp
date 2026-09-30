const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Serve static frontend files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Store connected users: { socketId: { username, room } }
const users = {};

// Helper: Get active users in a specific room
function getRoomUsers(room) {
  return Object.values(users)
    .filter(user => user.room === room)
    .map(user => user.username);
}

io.on('connection', (socket) => {
  // Event: Join Room
  socket.on('joinRoom', ({ username, room }) => {
    // Save user info
    users[socket.id] = { username, room };

    // Join Socket.io room channel
    socket.join(room);

    // Welcome current user
    socket.emit('message', {
      user: 'System',
      text: `Welcome to the ${room} room, ${username}!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    // Notify everyone else in the room
    socket.to(room).emit('message', {
      user: 'System',
      text: `${username} has joined the chat.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    // Update active user list for room members
    io.to(room).emit('roomUsers', getRoomUsers(room));
  });

  // Event: Send Chat Message
  socket.on('chatMessage', (msgText) => {
    const user = users[socket.id];
    if (!user) return;

    io.to(user.room).emit('message', {
      user: user.username,
      text: msgText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  });

  // Event: User Disconnects
  socket.on('disconnect', () => {
    const user = users[socket.id];
    if (user) {
      const { username, room } = user;
      delete users[socket.id];

      // Notify remaining room members
      io.to(room).emit('message', {
        user: 'System',
        text: `${username} has left the chat.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });

      // Update room users list
      io.to(room).emit('roomUsers', getRoomUsers(room));
    }
  });
});

server.listen(PORT, () => {
  console.log(`Chat server running at http://localhost:${PORT}`);
});