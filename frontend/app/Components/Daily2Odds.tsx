import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";

interface GameData {
  _id: string;
  gameTitle: string;
  startTime: string;
  homeTeam: string;
  awayTeam: string;
  prediction: string;
  odd: number;
}

const Daily2Odds: React.FC = () => {
  const [games, setGames] = useState<GameData[]>([]);
  const defaultDate = new Date();
  const BASE_URL = "https://odd2tips.onrender.com/api/";

  useEffect(() => {
    const fetchGames = async () => {
      const { data } = await axios.get<GameData[]>(
        `${BASE_URL}games/gameDataCollect`
      );
      setGames(data);
    };

    fetchGames();
  }, []);

  const totalOdds = games.reduce((acc, game) => acc * game.odd, 1);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-4 rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-center text-white mb-4">
          DAILY 2 ODDS
        </h2>
        <p className="text-center text-md text-blue-200">
          {format(defaultDate, "iiii, MMMM do, yyyy")}
        </p>
      </div>
      {games.map((game) => (
        <div
          key={game._id}
          className="border-b border-blue-300 p-4 hover:bg-blue-600 hover:bg-opacity-25 transition-colors rounded-lg mb-4"
        >
          <div className="mb-4">
            <span className="text-lg font-semibold text-yellow-200">
              {game.gameTitle}
            </span>
            <span className="ml-4 text-sm font-medium text-blue-100">
              {format(new Date(game.startTime), "MMMM d, p")}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <span className="font-semibold text-white">{game.homeTeam}</span>
              <span className="mx-2 text-white">vs</span>
              <span className="font-semibold text-white">{game.awayTeam}</span>
            </div>
            <div>
              <span className="text-sm bg-yellow-400 text-gray-800 py-1 px-3 rounded-full">
                {`${game.prediction} @ ${game.odd.toFixed(2)}`}
              </span>
            </div>
          </div>
        </div>
      ))}
      <div className="mt-4 p-4 text-right">
        <span className="text-lg font-bold text-white">Total Odds:</span>
        <span className="text-lg text-yellow-200 ml-2">
          {totalOdds.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default Daily2Odds;
