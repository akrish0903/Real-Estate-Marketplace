import React, { useState, useEffect } from 'react';
import Styles from './Chat.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { io } from 'socket.io-client';
import { useLocation } from 'react-router-dom';

const socket = io('http://localhost:4500', {
    reconnection: true, // Enable reconnection
    reconnectionAttempts: 5, // Number of reconnection attempts
    reconnectionDelay: 1000 // Delay before the next reconnection attempt
});

socket.on('connect', () => {
    console.log('Socket connected:', socket.id);
});

socket.on('connect_error', (error) => {
    console.error('Connection Error:', error);
});
 // Replace with your backend URL in production

const Chat = () => {
  const location = useLocation();
  const { buyerId, agentId, propertyId } = location.state || {};
  console.log('Received data in Chat component:', { buyerId, agentId, propertyId });

  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState('');

  // Fetch chats by buyer
  useEffect(() => {
    if (buyerId) {
      console.log('Fetching chats for buyerId:', buyerId);
      const fetchChats = async () => {
        const res = await fetch(`/api/chats/buyer/${buyerId}`);
        const data = await res.json();
        console.log('Fetched chats:', data);
        setChats(data);
      };
      fetchChats();
    }
  }, [buyerId]);

  // Join the chat room for real-time updates
  useEffect(() => {
    if (activeChat) {
      console.log('Joining chat room:', activeChat._id);
      socket.emit('joinChat', activeChat._id);

      // Listen for new messages
      socket.on('receiveMessage', (newMessage) => {
        console.log('New message received:', newMessage);
        setActiveChat((prev) => ({
          ...prev,
          messages: [...prev.messages, newMessage],
        }));
      });

      // Cleanup the listener when the chat changes
      return () => socket.off('receiveMessage');
    }
  }, [activeChat]);

  const sendMessage = async () => {
    if (message && activeChat) {
      console.log('Sending message:', message);
      await fetch(`/api/chats/${activeChat._id}/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sender: 'buyer', message }),
      });

      // Send the message via Socket.IO
      socket.emit('sendMessage', {
        chatId: activeChat._id,
        sender: 'buyer',
        text: message,
      });

      setMessage('');
    }
  };

  return (
    <div className={`screen ${Styles.chatScreen}`}>
      <Header />
      <div className={Styles.chatContainer} style={{marginTop:'0rem'}}>
        <div className={Styles.chatSidebar}>
          <h3>Conversations</h3>
          {chats.map((chat) => (
            <div 
              key={chat._id} 
              className={`${Styles.chatUser} ${activeChat?._id === chat._id ? 'active' : ''}`}
              onClick={() => setActiveChat(chat)}
            >
              {chat.agentId.usrFullName} - {chat.propertyId.title}
            </div>
          ))}
        </div>

        <div className={Styles.chatWindow}>
          {activeChat ? (
            <>
              <div className={Styles.chatHeader}>{activeChat.agentId.usrFullName}</div>
              <div className={Styles.chatMessages}>
                {activeChat.messages.map((msg, index) => (
                  <div key={index} className={`${Styles.chatMessage} ${msg.sender === 'buyer' ? 'buyer' : 'agent'}`}>
                    {msg.text}
                  </div>
                ))}
              </div>
              <div className={Styles.chatInput}>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                />
                <button onClick={sendMessage}>Send</button>
              </div>
            </>
          ) : (
            <div className="noChat">Select a chat to start messaging</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Chat;
