"use client";
import React from "react";
import CreateRoom from "../../Components/CreateRoom";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

const CreateRoomPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 hover:from-slate-900 hover:to-slate-500 text-[whitesmoke]">
        <div className="py-10">
          <CreateRoom />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CreateRoomPage;
