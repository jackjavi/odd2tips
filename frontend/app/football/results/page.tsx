"use client";

import React from "react";
import MatchResults from "./MatchResults";
import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";

const ResultsPage: React.FC = () => {
  return (
    <div className="bg-[whitesmoke]">
      <Navbar />
      <main className="container mx-auto p-4 h-screen">
        <div className="w-full md:w-2/3 h-full md:h-[70vh] overflow-scroll">
          <MatchResults />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResultsPage;
