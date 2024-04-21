"use client";

import React, { useState } from "react";
import { GoogleTagManager } from "@next/third-parties/google";

interface Room {
  id: string;
  name: string;
}

const TipsterRoom: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomName, setRoomName] = useState<string>("");

  const createRoom = () => {
    // Call your function to create a room here
    // For now, we'll just add a new room with a random ID to the state
    const newRoom: Room = {
      id: Math.random().toString(36).substring(7),
      name: roomName,
    };
    setRooms([...rooms, newRoom]);
    setRoomName("");
  };

  const joinRoom = (roomId: string) => {
    // Call your function to join a room here
    console.log(`Joining room with ID: ${roomId}`);
  };

  return (
    <div>
      <GoogleTagManager gtmId="G-T2RQ49FPP3" />
      <h1>Tipster Rooms</h1>
      <input
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="Room name"
      />
      <button onClick={createRoom}>Create Room</button>
      <h2>Rooms</h2>
      {rooms.map((room) => (
        <div key={room.id}>
          <span>{room.name}</span>
          <button onClick={() => joinRoom(room.id)}>Join</button>
        </div>
      ))}
    </div>
  );
};

export default TipsterRoom;
