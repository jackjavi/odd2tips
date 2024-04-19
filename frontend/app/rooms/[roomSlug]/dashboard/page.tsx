"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { GameData } from "@/interfaces/gameData";
import Navbar from "@/app/Components/Navbar";
import AddGames from "@/app/Components/AddGames";
import EditGames from "@/app/Components/EditGames";
import Footer from "@/app/Components/Footer";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { set } from "date-fns";

const AdminPage: React.FC = () => {
  return (
    <>
      <Navbar />{" "}
      <main className=" mx-auto my-10 container">
        <div className="flex md:flex-row flex-col">
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
