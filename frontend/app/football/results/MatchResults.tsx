"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "@/app/Components/Loading";

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
interface MatchResultProps {
  results: {
    date: string;
    league: string;
    teamOne: { name: string; score: number };
    teamTwo: { name: string; score: number };
  }[];
}

const MatchResults: React.FC<MatchResultProps> = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get("/api/football/get-results");
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching match results:", error);
        setError("Error fetching match results");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) return <Loading />;
  if (error)
    return (
      <div className="text-center text-lg text-red-500">Error: {error}</div>
    );
  return (
    <div className="bg-white shadow rounded-lg p-4 mx-auto my-6 max-w-4xl">
      {results.map((result, index) => (
        <div key={index} className="mb-4 last:mb-0">
          <div className="text-lg font-bold mb-2 text-[#5e17eb]">
            {result.league}
          </div>
          <div className="flex justify-between items-center bg-slate-50 px-3 py-2 rounded-md mb-2 shadow">
            <span className="font-medium text-slate-800">
              {result.teamOne.name}
            </span>
            <span className="text-sm bg-green-600 px-2 py-1 rounded text-white">
              {result.teamOne.score}
            </span>
          </div>
          <div className="flex justify-between items-center bg-slate-50 px-3 py-2 rounded-md shadow">
            <span className="font-medium text-slate-800">
              {result.teamTwo.name}
            </span>
            <span className="text-sm bg-green-600 px-2 py-1 rounded text-white">
              {result.teamTwo.score}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchResults;
