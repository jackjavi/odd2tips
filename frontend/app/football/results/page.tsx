"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import MatchResults from "./MatchResults";
import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";

interface TeamInfo {
  name: string;
  score: number;
}

interface Result {
  date: string;
  league: string;
  teamOne: TeamInfo;
  teamTwo: TeamInfo;
}

const ResultsPage: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get("/api/football/get-results");
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching match results:", error);
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="bg-[whitesmoke]">
      <Navbar />
      <main className="container mx-auto p-4 h-screen">
        <div className="w-full md:w-1/3 h-full md:h-[70vh] overflow-scroll">
          <MatchResults results={results} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResultsPage;
