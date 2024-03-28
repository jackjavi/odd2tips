"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { connectSocket, sendMessage, useSocket } from "../utils/socket";
import LoginModal from "./LoginModal";
import { CgProfile } from "react-icons/cg";

const Chat = () => {
  const [token, setToken] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const messagesEndRef = useRef(null);
  const BASE_URL = `https://odd2tips.onrender.com/api/`;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setToken(JSON.parse(localStorage.getItem("token")));
        const response = await axios.get(`${BASE_URL}chat/messages`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMessages(response.data);
        console.log(response.data);
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
    if (!token) {
      setShowLoginModal(true);
      return;
    }
    if (newMessage.trim()) {
      sendMessage(newMessage.trim());
      setNewMessage("");
    }
  };

  const handleModalClose = () => {
    setShowLoginModal(false);
  };

  return (
    <>
      {showLoginModal && <LoginModal onClose={handleModalClose} />}
      <div className="flex flex-col h-[50vh] max-w-lg mx-auto rounded-lg shadow overflow-hidden border border-gray-200">
        <div className="bg-gradient-to-r from-blue-600 to-teal-400 p-4 text-white font-semibold flex justify-between items-center">
          <span>Fan Zone</span>
          <div className="flex items-center bg-white text-blue-800 rounded-full px-3 py-1 text-xs font-bold">
            <span className="text-sm md:text-md p-1">Live</span>
            <span className="animate-pulse bg-red-500 rounded-full w-3 h-3 mr-2"></span>
          </div>
        </div>

        <div
          className="flex-1 p-4 overflow-y-auto"
          style={{
            backgroundImage: "url('/football_bg.jpg')",
            backgroundSize: "cover",
          }}
        >
          <ul>
            {messages.map((msg, index) => (
              <li key={index} className="bg-white rounded-md mb-2 shadow">
                <div className="flex items-center p-2">
                  {msg.userProfilePicture ? (
                    <img
                      src={msg.userProfilePicture}
                      alt={msg.userName || "User"}
                      className="rounded-full w-8 h-8 mr-2"
                    />
                  ) : (
                    <CgProfile className="w-8 h-8 mr-2 text-blue-500" />
                  )}
                  <span className="font-semibold mr-2 text-blue-500">
                    {msg.userName || msg.user}
                  </span>
                  <span className="ml-auto text-xs text-gray-500">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="px-2 pb-2 text-gray-600">{msg.content}</div>
              </li>
            ))}

            <div ref={messagesEndRef} />
          </ul>
        </div>

        <form onSubmit={handleSendMessage} className="p-4 bg-gray-50">
          <div className="flex items-center space-x-3">
            <input
              className="flex-1 border p-2 w-full rounded-lg text-gray-800 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message here..."
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Chat;
