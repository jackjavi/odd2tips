"use client";

import React, { useState, useEffect } from "react";
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
  const [totalOdds, setTotalOdds] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const { data } = await axios.get<GameData[]>(
          `/api/games/gameDataCollect?roomId=${roomId}`
        );
        setGames(data);
        calculateTotalOdds(data);
      } catch (error) {
        console.error("Failed to fetch games:", error);
      } finally {
        setLoading(false);
      }
    };

    if (roomId) {
      fetchGames();
    }
  }, [roomId]);

  const calculateTotalOdds = (games: GameData[]) => {
    let newTotalOdds = 0;
    games.forEach((game) => {
      switch (game.prediction) {
        case "Home win":
          newTotalOdds += parseFloat(game.homeOdd);
          break;
        case "Away win":
          newTotalOdds += parseFloat(game.awayOdd);
          break;
        case "Draw":
          newTotalOdds += parseFloat(game.drawOdd);
          break;
        default:
          break;
      }
    });
    setTotalOdds(newTotalOdds);
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow rounded overflow-hidden">
      {games.length === 0 ? (
        <div className="p-6 text-center text-lg font-medium text-gray-500">
          No games available. Please check back later.
        </div>
      ) : (
        <>
          {games.map((game) => (
            <div
              key={game._id}
              className="p-4 border-b border-gray-200 last:border-b-0"
            >
              <h3 className="text-lg font-semibold text-purple-600">
                {game.gameTitle}
              </h3>
              <p className="text-gray-500">{game.date}</p>
              <div className="grid grid-cols-2 gap-4 my-2">
                <div>
                  <h4 className="text-md font-semibold">
                    {game.homeTeam} vs {game.awayTeam}
                  </h4>
                  <p className="text-gray-500">Prediction: {game.prediction}</p>
                  <p className={`text-sm ${getStatusStyle(game.status)}`}>
                    {game.status}
                  </p>
                </div>
                <div>
                  <div className="text-right">
                    <p className="text-green-600">Home: {game.homeOdd}</p>
                    <p className="text-blue-600">Draw: {game.drawOdd}</p>
                    <p className="text-red-600">Away: {game.awayOdd}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="p-4 text-center text-lg">
            Total Odds: {totalOdds.toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
};

function getStatusStyle(status: string) {
  switch (status) {
    case "Home win":
      return "text-green-500";
    case "Away win":
      return "text-red-500";
    case "Draw":
      return "text-blue-500";
    default:
      return "text-gray-400";
  }
}

export default Daily2Odds;
