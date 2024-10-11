// /acrea_backend/controllers/chatController.js
const Chat = require('../models/Chat');
const UserAuthModel = require("../models/UserAuthModel");
const UserPropertiesModel = require("../models/UserPropertiesModel");
const httpErrors = require("http-errors");

exports.getChatsByBuyer = async (req, res) => {
  const { buyerId } = req.params;
  try {
    const chats = await Chat.find({ buyerId }).populate('agentId').populate('propertyId');
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chats', error });
  }
};

exports.createChat = async (req, res) => {
  const {  agentId, propertyId, message } = req.body;
  var buyerId = req.payload.aud;
  try {
    const newChat = new Chat({
      buyerId,
      agentId,
      propertyId,
      messages: [{ sender: 'buyer', text: message }]
    });
    const savedChat = await newChat.save();
    res.status(201).json(savedChat);
  } catch (error) {
    res.status(500).json({ message: 'Error creating chat', error });
  }
};

exports.addMessage = async (req, res) => {
    const { chatId } = req.params;
    const { sender, message } = req.body;
    try {
      const chat = await Chat.findById(chatId);
      if (!chat) return res.status(404).json({ message: 'Chat not found' });
      
      const newMessage = { sender, text: message };
      chat.messages.push(newMessage);
      await chat.save();
  
      // Emit the message to all users in the chat room
      req.io.to(chatId).emit('receiveMessage', newMessage);
  
      res.status(200).json(chat);
    } catch (error) {
      res.status(500).json({ message: 'Error sending message', error });
    }
  };
  
