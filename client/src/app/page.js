'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { io } from 'socket.io-client'
export default function Home() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const socket = io('http://localhost:4000')
  useEffect(() => {
    // Listen for messages from the server
    socket.on('receive_message', (data) => {
      setChat((prevChat) => [...prevChat, data]);
    });

    // Clean up the socket connection
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    // Emit a message to the server
    socket.emit('send_message', message);
    setMessage('');
  };
  return (
    <div>
      <h1>Chat App</h1>
      <div>
        {chat.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
