// /acrea_backend/server.js
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');

const chatRoutes = require('./Routes/chatRoutes');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors({
    origin: ['http://localhost:4500'], // Replace with your React app's URL
    methods: ['GET', 'POST'],
    credentials: true // Enable if you need to send cookies
  }));
  app.use(express.json());

// Routes
app.use('/api/chats', chatRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
.catch((error) => console.log(`Error connecting to MongoDB: ${error.message}`));

// Handle socket connection for real-time chat
io.on('connection', (socket) => {
    console.log('New client connected');
  
    socket.on('joinChat', (chatId) => {
      socket.join(chatId);
      console.log(`User joined chat: ${chatId}`);
    });
  
    socket.on('sendMessage', (data) => {
      const { chatId, message } = data;
      io.to(chatId).emit('message', message); // Broadcast message to everyone in the chat
    });
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
  

const PORT = process.env.PORT || 4500;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
