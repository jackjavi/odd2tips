"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { GameData } from "@/interfaces/gameData";
import Navbar from "@/app/Components/Navbar";
import AddGames from "@/app/Components/AddGames";
import EditGames from "@/app/Components/EditGames";
import Footer from "@/app/Components/Footer";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { GoogleTagManager } from "@next/third-parties/google";

const AdminPage: React.FC = () => {
  return (
    <>
      {" "}
      <GoogleTagManager gtmId="G-2242Y4EH8R" />
      <Navbar />{" "}
      <main className=" mx-auto my-10 container">
        <div className="flex md:flex-row flex-col w-[80vw] md:w-[90vw] gap-8">
          <div className="md:w-1/3">
            <AddGames />
          </div>
          <div className="md:w-2/3">
            <EditGames />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AdminPage;
