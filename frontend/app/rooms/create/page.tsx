import React from "react";
import CreateRoom from "../../Components/CreateRoom";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
export const dynamicParams = true;

export const metadata: Metadata = {
  title: "Become our Top Tipster",
  description:
    "Create a room and sell high-quality football predictions to other football enthusiasts. Get started now!",
  keywords: [
    "football predictions, football analysis, football betslips, expert tips, football enthusiasts, football fans",
  ],
};

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

      <Script
        type="text/javascript"
        async
        src="//pl23430474.highcpmgate.com/d4/db/06/d4db06bc86d5410193a1ac45bef7482a.js"
      />
    </>
  );
};

export default CreateRoomPage;
