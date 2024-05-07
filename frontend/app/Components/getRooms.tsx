"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Loading from "./Loading";

interface Room {
  _id: string;
  title: string;
  description: string;
  privacy: string;
  adminId: string;
  members: string[];
  createdAt: string;
}

const RoomsList: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("/api/rooms/get", {
          withCredentials: true,
        });
        setRooms(response.data);
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
        setError("Failed to load rooms. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4 h-full">
      <h2 className="text-2xl font-semibold mb-4 text-teal-800">
        Tipster Rooms
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4   ">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="p-4 border rounded-lg shadow-lg bg-teal-800  h-[35vh]  overflow-y-auto"
          >
            <h3 className="md:text-xl text-md font-bold text-[whitesmoke]">
              {room.title}
            </h3>
            <p className="text-gray-400 mt-2 md:h-[15vh] h-[10vh] overflow-scroll text-sm md:text-lg">
              {room.description}
            </p>
            <div className="mt-2">
              <span className="px-1 py-1 text-[8px] sm:text-[12px] md:text-xs rounded bg-slate-300 text-gray-800">
                {room.privacy.toUpperCase()}
              </span>
            </div>
            <Link
              href={`/rooms/${encodeURIComponent(room.title)}?roomId=${
                room._id
              }&adminId=${room.adminId}&roomTitle=${room.title}`}
            >
              <button className="text-sm md:text-md mt-4 px-4 py-2 bg-slate-400 text-white rounded hover:bg-slate-200 transition-colors">
                Visit Room
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomsList;
