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
  const defaultDate = new Date(2024, 2, 23);
  const BASE_URL = "https://odd2tips.onrender.com/api/";

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found, redirecting to login...");
      // Implement redirect to login if needed
      return;
    }

    const fetchGames = async () => {
      const { data } = await axios.get<GameData[]>(
        `${BASE_URL}games/gameData`,
        {
          headers: { Authorization: `Bearer ${JSON.parse(token)}` },
        }
      );
      setGames(data);
    };

    fetchGames();
  }, []);

  const totalOdds = games.reduce((acc, game) => acc * game.odd, 1);

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
          key={game._id}
          className="border-b border-gray-700 p-2 hover:bg-gray-700 transition-colors"
        >
          <div className="mb-2">
            {/* Game title and start time */}
            <span className="text-lg font-semibold">{game.gameTitle}</span>
            <span className="ml-4 text-xs font-medium">
              {format(new Date(game.startTime), "MMMM d, p")}
            </span>
          </div>
          <div className="flex justify-between items-center">
            {/* Teams */}
            <div>
              <span className="font-semibold">{game.homeTeam}</span>
              <span className="mx-2">vs</span>
              <span className="font-semibold">{game.awayTeam}</span>
            </div>
            {/* Prediction @ Odd */}
            <div>
              <span className="text-sm">{`${
                game.prediction
              } @ ${game.odd.toFixed(2)}`}</span>
            </div>
          </div>
        </div>
      ))}
      <div className="mt-4 p-2 text-right">
        <span className="text-lg font-bold">Total Odds:</span>
        <span className="text-lg"> {totalOdds.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Daily2Odds;
