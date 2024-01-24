// client/src/components/Chat.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Adjust the URL to match your server

function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Listen for 'chat message' events and update the state
    const handleChatMessage = (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    };
  
    socket.on('chat message', handleChatMessage);
  
    // Clean up the socket connection when the component unmounts
    return () => {
      socket.off('chat message', handleChatMessage);
    };
  }, []);
  

  const sendMessage = () => {
    // Emit 'chat message' event with the current message
    socket.emit('chat message', message);
    setMessage(''); // Clear the input field after sending the message
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
