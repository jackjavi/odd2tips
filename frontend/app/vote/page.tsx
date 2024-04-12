"use client";

import React, { useState } from "react";

interface Match {
  id: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  voteCounts: {
    homeWin: number;
    draw: number;
    awayWin: number;
  };
}

interface Vote {
  matchId: string;
  prediction: "homeWin" | "draw" | "awayWin";
}

const VoteSystem: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([
    {
      id: "match1",
      time: "2021-08-01 12:00",
      homeTeam: "Team A",
      awayTeam: "Team B",
      voteCounts: {
        homeWin: 10,
        draw: 5,
        awayWin: 3,
      },
    },
    {
      id: "match2",
      time: "2021-08-01 15:00",
      homeTeam: "Team C",
      awayTeam: "Team D",
      voteCounts: {
        homeWin: 7,
        draw: 6,
        awayWin: 8,
      },
    },
  ]);

  const castVote = (
    matchId: string,
    prediction: "homeWin" | "draw" | "awayWin"
  ) => {
    setMatches((currentMatches) =>
      currentMatches.map((match) =>
        match.id === matchId
          ? {
              ...match,
              voteCounts: {
                ...match.voteCounts,
                [prediction]: match.voteCounts[prediction] + 1,
              },
            }
          : match
      )
    );
  };

  const voteButtonClasses = "px-3 py-1 text-white font-bold cursor-pointer";
  const getButtonColor = (prediction: "homeWin" | "draw" | "awayWin") => {
    switch (prediction) {
      case "homeWin":
        return "bg-green-500 hover:bg-green-600";
      case "draw":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "awayWin":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "";
    }
  };

  return (
    <div className="container mx-auto my-8">
      <div className="overflow-x-auto">
        <table className="min-w-full text-center bg-gradient-to-r from-blue-700 to-cyan-500 rounded-md">
          <thead className="text-white">
            <tr>
              <th>Time</th>
              <th>Home Team</th>
              <th>Draw</th>
              <th>Away Team</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match) => (
              <tr key={match.id} className="bg-white bg-opacity-10 text-white">
                <td>{match.time}</td>
                <td
                  className={`${voteButtonClasses} ${getButtonColor(
                    "homeWin"
                  )}`}
                  onClick={() => castVote(match.id, "homeWin")}
                >
                  {match.voteCounts.homeWin} ({match.homeTeam})
                </td>
                <td
                  className={`${voteButtonClasses} ${getButtonColor("draw")}`}
                  onClick={() => castVote(match.id, "draw")}
                >
                  {match.voteCounts.draw} (Draw)
                </td>
                <td
                  className={`${voteButtonClasses} ${getButtonColor(
                    "awayWin"
                  )}`}
                  onClick={() => castVote(match.id, "awayWin")}
                >
                  {match.voteCounts.awayWin} ({match.awayTeam})
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VoteSystem;
