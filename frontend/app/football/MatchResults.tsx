"use client";

import React from "react";

interface MatchResultProps {
  results: {
    date: string;
    league: string;
    teamOne: { name: string; score: number };
    teamTwo: { name: string; score: number };
  }[];
}

const MatchResults: React.FC<MatchResultProps> = ({ results }) => {
  return (
    <div className="bg-slate-800 p-4 text-white rounded-md">
      {results.map((result, index) => (
        <div key={index} className="mb-4 last:mb-0">
          <div className="text-lg font-bold mb-2">{result.league}</div>
          <div className="flex justify-between items-center bg-slate-700 px-3 py-2 rounded-md mb-2">
            <span className="font-medium">{result.teamOne.name}</span>
            <span className="text-sm bg-slate-600 px-2 py-1 rounded">
              {result.teamOne.score}
            </span>
          </div>
          <div className="flex justify-between items-center bg-slate-700 px-3 py-2 rounded-md">
            <span className="font-medium">{result.teamTwo.name}</span>
            <span className="text-sm bg-slate-600 px-2 py-1 rounded">
              {result.teamTwo.score}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchResults;
