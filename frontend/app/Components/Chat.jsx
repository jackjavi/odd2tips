"use client";

import React, { useState, useRef, useEffect, use } from "react";
import axios from "axios";
import { connectSocket, sendMessage, useSocket } from "../utils/socket";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await axios.get(
          "http://localhost:8888/api/chat/messages",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        return;
        setMessages(response.data);
        console.log("Messages fetched:", response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, []);
  useEffect(() => {
    connectSocket();
  }, []);

  useSocket("chat message", (msg) => {
    setMessages((prevMessages) => [...prevMessages, msg]);
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage(newMessage.trim());
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-[50vh] max-w-md mx-auto border border-gray-300 rounded-lg shadow-lg overflow-hidden">
      <div className="bg-green-600 p-4 text-white text-lg font-bold flex justify-between items-center">
        <span>Fan Zone</span>
        <span className="text-sm">Live</span>
      </div>

      <div
        className="flex-1 p-4 overflow-y-auto bg-gray-100"
        style={{
          backgroundImage: "url('/football_bg.jpg')",
          backgroundSize: "cover",
        }}
      >
        <ul>
          {messages.map((msg, index) => (
            <li
              key={index}
              className="bg-white text-gray-900 rounded-md p-2 mb-2 shadow"
            >
              {msg.content}
            </li>
          ))}
          <div ref={messagesEndRef} />
        </ul>
      </div>

      <form onSubmit={handleSendMessage} className="p-4 bg-white border-t">
        <input
          className="border p-2 w-full rounded-md text-gray-900"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit" className="hidden">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
