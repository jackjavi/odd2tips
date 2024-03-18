import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

export const connectSocket = () => {
  console.log("Connecting to socket...");
  socket = io("http://localhost:8888"); // Adjust your server URL/port accordingly

  socket.on("connect", () => {
    console.log("Connected to socket server");
  });
};

export const useSocket = (eventName, cb) => {
  useEffect(() => {
    if (!socket) {
      console.log("No socket connection");
      return;
    }

    // Listen for socket event
    socket.on(eventName, cb);

    // Cleanup on unmount
    return () => {
      socket.off(eventName, cb);
    };
  }, [eventName, cb]);
};

export const sendMessage = (message) => {
  if (socket) socket.emit("chat message", message);
};
