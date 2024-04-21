"use client";
import React from "react";
import CreateRoom from "../../Components/CreateRoom";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { GoogleTagManager } from "@next/third-parties/google";

const CreateRoomPage: React.FC = () => {
  return (
    <>
      <GoogleTagManager gtmId="G-T2RQ49FPP3" />
      <Navbar />
      <main className="min-h-screen bg-[whitesmoke] text-teal-500">
        <div className="py-10">
          <CreateRoom />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CreateRoomPage;
