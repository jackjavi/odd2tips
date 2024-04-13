"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Daily2Odds from "../../Components/Daily2Odds";
import Navbar from "../../Components/Navbar";
import {
  FaTelegramPlane,
  FaWhatsapp,
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";
import { getRoomByTitle } from "../../../lib/room";

interface Room {
  _id: string;
  title: string;
  description: string;
  privacy: string;
  adminId: string;
  members: string[];
  createdAt: string;
}

const RoomPage: React.FC = () => {
  const roomSlug = useParams();
  const [room, setRoom] = useState<Room | null>(null);

  useEffect(() => {
    if (typeof roomSlug.roomSlug === "string") {
      getRoomByTitle(roomSlug.roomSlug)
        .then((fetchedRoom) => {
          setRoom(fetchedRoom);
        })
        .catch((error) => {
          console.error("Error fetching room details:", error);
        });
    }
  }, [roomSlug]);

  if (!room) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-4 h-screen shadow-lg mb-6 rounded-b-md">
        <h2 className="text-2xl font-bold text-center text-white mb-4 pt-8 pb-2">
          {room.title}
        </h2>
        <p className="text-center text-md text-blue-200">{room.description}</p>

        <div className="flex justify-center gap-4 mt-4">
          <a href="#" className="text-white text-2xl">
            <FaTelegramPlane />
          </a>
          <a href="#" className="text-white text-2xl">
            <FaWhatsapp />
          </a>
          <a href="#" className="text-white text-2xl">
            <FaTwitter />
          </a>
          <a href="#" className="text-white text-2xl">
            <FaFacebookF />
          </a>
          <a href="#" className="text-white text-2xl">
            <FaInstagram />
          </a>
          <a href="#" className="text-white text-2xl">
            <FaTiktok />
          </a>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-white mb-4">
            Today&lsquo;s Tip
          </h3>
          <Daily2Odds />
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
