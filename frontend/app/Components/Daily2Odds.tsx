import React from "react";
import { GameData } from "@/interfaces/gameData";
import { format } from "date-fns";

const games: GameData[] = [
  {
    id: 1,
    oddTitle: "Match 1",
    startTime: "2024-03-21T18:00:00Z",
    homeTeam: "Worthing",
    awayTeam: "Bath City",
    prediction: "Total Over 2",
    odd: 1.26,
  },
  {
    id: 2,
    oddTitle: "Match 2",
    startTime: "2024-03-21T18:00:00Z",
    homeTeam: "Sibenik",
    awayTeam: "Cibalia",
    prediction: "Total Over 2",
    odd: 1.3,
  },
  {
    id: 3,
    oddTitle: "Match 3",
    startTime: "2024-03-21T12:30:00Z",
    homeTeam: "Petrzalka",
    awayTeam: "Puchov",
    prediction: "Total Over 2",
    odd: 1.24,
  },
];
const defaultDate = new Date(2024, 2, 23);
const totalOdds = games.reduce(
  (accumulator, game) => accumulator * game.odd,
  1
);

const Daily2Odds: React.FC = () => {
  return (
    <div className="bg-slate-800 p-4 text-white rounded-lg">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-center mb-2">DAILY 2 ODDS</h2>
        <p className="text-center text-sm">
          {format(defaultDate, "iiii, MMMM do, yyyy")}
        </p>
      </div>
      {games.map((game) => (
        <div
          key={game.id}
          className="grid grid-cols-12 items-center border-b border-gray-700 p-2 hover:bg-gray-700 transition-colors"
        >
          <div className="col-span-3">
            <span className="text-xs font-medium">
              {format(new Date(game.startTime), "MMMM d p")}
            </span>
          </div>
          <div className="col-span-6 flex ">
            <span className="font-semibold">{game.homeTeam}</span>
            <span className="mx-2">vs</span>
            <span className="font-semibold"> {game.awayTeam}</span>
          </div>
          <div className="col-span-3 flex justify-end">
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
