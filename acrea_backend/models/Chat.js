// /acrea_backend/models/Chat.js
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  messages: [
    {
      sender: { type: String, enum: ['buyer', 'agent'], required: true },
      text: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

const ChatModel = mongoose.model(process.env.MONGO_TABLE_CHAT, chatSchema);
console.log("-------------working properties-----")
module.exports = ChatModel;
