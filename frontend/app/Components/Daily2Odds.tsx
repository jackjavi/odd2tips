"use state";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { GameData } from "@/interfaces/gameData";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

const Daily2Odds: React.FC = () => {
  const [games, setGames] = useState<GameData[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchGames = async () => {
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

      const token = localStorage.getItem("token");
      console.log(process.env.NEXT_PUBLIC_API_URL);

      if (!token) {
        console.log("No token found, redirecting to login...");

        return;
      }
      try {
        const response = await axios.get<GameData[]>(
          "https://odd2tips.onrender.com/api/games/gameData",
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          }
        );
        setGames(response.data);
        console.log("Games data fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching games data", error);
      }
    };

    fetchGames();
  }, []);

  // Assuming all games have the same predictionType for simplicity
  const sectionTitle =
    games.length > 0 ? games[0].predictionType : "Loading...";

  const totalOdds = games.reduce(
    (accumulator, game) => accumulator * game.odd,
    1
  );

  return (
    <div className="bg-slate-800 p-4 text-white rounded-lg">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-center mb-2">{sectionTitle}</h2>
        <p className="text-center text-sm">
          {format(new Date(), "iiii, MMMM do, yyyy")}
        </p>
      </div>
      {games.map((game) => (
        <React.Fragment key={game._id}>
          <h3 className="text-md font-semibold text-center my-2">
            {game.gameTitle}
          </h3>
          <div className="grid grid-cols-12 items-center border-b border-gray-700 p-2 hover:bg-gray-700 transition-colors">
            <div className="col-span-3">
              <span className="text-xs font-medium">
                {format(new Date(game.startTime), "MMMM d p")}
              </span>
            </div>
            <div className="col-span-6 flex">
              <span className="font-semibold">{game.homeTeam}</span>
              <span className="mx-2">vs</span>
              <span className="font-semibold">{game.awayTeam}</span>
            </div>
            <div className="col-span-3 flex justify-end">
              <span className="w-12 text-center text-sm bg-blue-500 rounded-full py-1">
                {game.odd.toFixed(2)}
              </span>
            </div>
          </div>
        </React.Fragment>
      ))}
      <div className="mt-4 p-2 text-right">
        <span className="text-lg font-bold">Total Odds: </span>
        <span className="text-lg">{totalOdds.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Daily2Odds;
