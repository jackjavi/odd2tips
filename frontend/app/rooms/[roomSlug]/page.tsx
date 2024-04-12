"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Daily2Odds from "../../Components/Daily2Odds";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

const RoomPage: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black">
        <div className="py-10">
          <div className="container mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-white"></h1>
              <p className="text-xl text-gray-400 font-bold">Welcome!</p>
            </div>
            <Daily2Odds />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RoomPage;
