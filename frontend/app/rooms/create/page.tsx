import React from "react";
import CreateRoom from "../../Components/CreateRoom";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import Head from "next/head";

<Head>
  <script
    type="text/javascript"
    src="//pl23425064.highcpmgate.com/eb/5c/12/eb5c12854223758b1c37d433598047c3.js"
  ></script>
</Head>;

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
    </>
  );
};

export default CreateRoomPage;
