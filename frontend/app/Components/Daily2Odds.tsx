"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Loading from "./Loading";
import { GameData } from "../../interfaces/gameData";

interface Daily2OddsProps {
  roomId: string | null;
  roomTitle: string | null;
  adminId: string | null;
}

const Daily2Odds: React.FC<Daily2OddsProps> = ({
  roomId,
  roomTitle,
  adminId,
}) => {
  const [games, setGames] = useState<GameData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const { data } = await axios.get<GameData[]>(
          `/api/games/gameDataCollect?roomId=${roomId}`
        );
        setGames(data);
      } catch (error) {
        console.error("Failed to fetch games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [roomId]);

  if (loading) return <Loading />;

  return (
    <div className="bg-white p-6 shadow-lg divide-y divide-gray-200">
      {games.length === 0 ? (
        <div className="text-center text-lg text-gray-500">
          No games available for now in this room. Explore other rooms{" "}
          <a href="/rooms" className="underline italic">
            here
          </a>
          .
        </div>
      ) : (
        games.map((game, index) => (
          <div
            key={game._id}
            className={`py-3 ${index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}`}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="text-sm text-gray-500">
                  {game.gameTitle} - {game.countryName}
                </div>
                <div className="text-lg font-bold text-purple-600">
                  {game.homeTeam} vs {game.awayTeam}
                </div>
                <div className="text-sm text-gray-500">
                  Prediction: {game.prediction}
                </div>
              </div>
              <div>
                <div className="text-sm font-bold">
                  Odds: {game.odds.join(", ")}
                </div>
                <div
                  className={`text-sm font-semibold ${getStatusStyle(
                    game.status
                  )}`}
                >
                  {game.status || "Pending"}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

function getStatusStyle(status: string | undefined) {
  switch (status) {
    case "Home win":
      return "text-green-500";
    case "Away win":
      return "text-red-500";
    case "Draw":
      return "text-yellow-500";
    default:
      return "text-gray-400";
  }
}

export default Daily2Odds;
