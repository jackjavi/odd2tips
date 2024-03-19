"use client";

import React, { useState } from "react";
import { connectSocket, sendMessage, useSocket } from "../utils/socket";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Connect to socket when component mounts
  useState(() => {
    connectSocket();
  }, []);

  // Handle incoming messages
  useSocket("chat message", (msg) => {
    setMessages((prevMessages) => [...prevMessages, msg]);
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage(newMessage.trim());
      setNewMessage("");
    }
  };

  return (
    <div className="chat-container">
      <h2 className="bg-red-500 text-white">Chat Room</h2>
      <div>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSendMessage}>
        <input
          className="text-black"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
