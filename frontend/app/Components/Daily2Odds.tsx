// components/Daily2Odds.tsx

import React from "react";
import { GameData } from "@/interfaces/gameData";
import { format } from "date-fns";

const games: GameData[] = [
  {
    id: 1,
    oddTitle: "Match 1",
    startTime: "2024-03-21T14:00:00Z",
    homeTeam: "Manchester City Women",
    awayTeam: "Man Utd Women",
    prediction: "Home Win",
    odd: 1.5,
  },
  {
    id: 2,
    oddTitle: "Match 2",
    startTime: "2024-03-21T16:00:00Z",
    homeTeam: "France",
    awayTeam: "Germany",
    prediction: "Away Win",
    odd: 1.5,
  },
];
const defaultDate = new Date(2024, 2, 23);
const totalOdds = games.reduce(
  (accumulator, game) => accumulator * game.odd,
  1
);

const Daily2Odds: React.FC = () => {
  return (
    <div className="bg-gray-800 p-4 text-white rounded-lg">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-center mb-2">DAILY 2 ODDS</h2>
        <p className="text-center text-sm">
          {format(defaultDate, "iiii, MMMM do, yyyy")}
        </p>
      </div>
      {games.map((game, index) => (
        <div
          key={index}
          className="flex justify-between items-center border-b border-gray-700 p-2 hover:bg-gray-700 transition-colors"
        >
          <div className="flex items-center">
            <span className="text-xs font-medium mr-2">
              {format(new Date(game.startTime), "MMMM d p")}
            </span>
            <span className="font-semibold">{game.homeTeam}</span>
            <span className="mx-2">vs</span>
            <span className="font-semibold"> {game.awayTeam}</span>
          </div>
          <div className="flex items-center justify-center">
            <span className="w-12 text-center text-sm bg-blue-500 rounded-full py-1">
              {game.odd.toFixed(2)}
            </span>
          </div>
        </div>
      ))}
      <div className="mt-4 p-2 text-right">
        <span className="text-lg font-bold">Total Odds: </span>
        <span className="text-lg">{totalOdds.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Daily2Odds;
