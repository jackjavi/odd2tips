"use client";
import React from "react";
import CreateRoom from "../../Components/CreateRoom";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

const CreateRoomPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[whitesmoke] text-blue-500">
        <div className="py-10">
          <CreateRoom />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CreateRoomPage;
