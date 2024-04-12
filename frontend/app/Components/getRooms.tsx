import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">
        Tipster Rooms
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="p-4 border rounded-lg shadow-lg bg-blue-50"
          >
            <h3 className="text-xl font-bold text-blue-600">{room.title}</h3>
            <p className="text-gray-700">{room.description}</p>
            <div className="mt-2">
              <span className="px-2 py-1 text-xs rounded bg-blue-200 text-blue-800">
                {room.privacy.toUpperCase()}
              </span>
            </div>
            <Link href={`/rooms/${room.title}`}>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                Join Room
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomsList;
