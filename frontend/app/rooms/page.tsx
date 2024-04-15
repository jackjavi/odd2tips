"use client";

import React from "react";
import Navbar from "../Components/Navbar";
import CreateRoomLink from "../Components/CreateRoomLink";
import GetRooms from "../Components/getRooms";
import Footer from "../Components/Footer";

const GetRoomPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-gradient-to-r from-blue-600 to-green-500">
        <div className="absolute top-4 right-4 md:top-8 md:right-8">
          <CreateRoomLink />
        </div>
        <main className="flex flex-col items-center justify-center py-10">
          <GetRooms />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default GetRoomPage;
