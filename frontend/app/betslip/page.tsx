"use client";
import React from "react";
import Navbar from "@/app/Components/Navbar";
import AddBetSlipLS from "@/app/Components/AddBetSlipLS";
import BetSlipDownload from "@/app/Components/BetSlipDownload";
import CreateDownloadBanner from "@/app/Components/CreateDownloadBanner";
import Footer from "@/app/Components/Footer";

const CreateRoomPage: React.FC = () => {
  return (
    <>
      <Navbar />

      <CreateDownloadBanner />

      <main className="min-h-screen bg-[whitesmoke] text-teal-500 px-[10%] mx-auto  flex flex-col md:flex-row gap-8">
        <div className="py-10 md:w-1/3 w-full md:flex md:flex-col md:items-center md:justify-center">
          <BetSlipDownload />
        </div>
        <div className="py-10 md:w-1/3">
          <AddBetSlipLS />
        </div>
        <div className="py-10 md:w-1/3 bg-teal-600"></div>
      </main>
      <Footer />
    </>
  );
};

export default CreateRoomPage;
