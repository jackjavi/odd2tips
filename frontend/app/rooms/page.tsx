"use client";

import React from "react";
import Navbar from "../Components/Navbar";
import CreateRoomLink from "../Components/CreateRoomLink";
import GetRooms from "../Components/getRooms";
import Footer from "../Components/Footer";

const GetRoomPage: React.FC = () => {
  return (
    <>
      <main className="relative min-h-screen md:min-h-screen bg-[whitesmoke]">
        <Navbar />
        <div className="absolute top-28 right-4 md:top-56 md:right-8">
          <CreateRoomLink />
        </div>
        <div className="flex flex-col items-center justify-center py-10">
          <GetRooms />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default GetRoomPage;
