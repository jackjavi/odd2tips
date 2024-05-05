"use client";

import React from "react";
import MatchResults from "./MatchResults";
import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";

const ResultsPage: React.FC = () => {
  return (
    <div className="bg-[whitesmoke]">
      <Navbar />
      <main mx-auto>
        <div className="md:w-2/3">
          <MatchResults />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResultsPage;
