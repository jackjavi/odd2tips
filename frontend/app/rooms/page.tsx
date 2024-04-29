import React from "react";
import Navbar from "../Components/Navbar";
import CreateRoomLink from "../Components/CreateRoomLink";
import GetRooms from "../Components/getRooms";
import Footer from "../Components/Footer";
import { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Top Football Predictions Analysis & Betslips | BetRoom",
  description:
    "Get the best football predictions and analysis from our expert tipsters. Download betslips instantly and engage with other football enthusiasts.",
  keywords: [
    "football predictions, football analysis, football betslips, expert tips, football enthusiasts, football fans",
  ],
};

const GetRoomPage: React.FC = () => {
  return (
    <>
      {" "}
      <GoogleTagManager gtmId="G-T2RQ49FPP3" />
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
