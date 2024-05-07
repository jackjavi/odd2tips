"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
interface GameData {
  _id: string;
  gameTitle: string;
  homeTeam: string;
  awayTeam: string;
  prediction: string;
  last5home: string[];
  last5away: string[];
  homeOdd: string;
  drawOdd: string;
  awayOdd: string;
  countryName: string;
  roomId: string;
  date: string;
  status: string;
  roomTitle: string;
}

const RandomGameData: React.FC = () => {
  const [games, setGames] = useState<GameData[]>([]);
  const [totalOdds, setTotalOdds] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const { data } = await axios.get<GameData[]>(
          `/api/games/randomGameData`
        );

        setGames(data);
        calculateTotalOdds(data);
      } catch (error) {
        console.error("Failed to fetch games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

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
    <div className="max-w-4xl mx-auto bg-white shadow rounded-lg overflow-hidden">
      <h2 className="md:text-3xl text-xl font-bold text-center text-green-500 mt-8 mb-6">
        RANDOMLY FEATURED TIPSTER
      </h2>
      <h3 className="md:text-lg text-md font-bold text-center text-gray-800 mb-6 font-playfair">
        Tipster Room - {games[0].roomTitle}
      </h3>
      {games.length === 0 ? (
        <div className="p-6 text-center text-lg font-medium text-teal-500">
          No games available. Please check back later.
        </div>
      ) : (
        <>
          {games.map((game) => (
            <div
              key={game._id}
              className="p-4 border-b border-gray-200 last:border-b-0"
            >
              <h3 className="text-xl font-semibold text-purple-600 mb-2">
                {game.gameTitle}
              </h3>
              <p className="text-teal-500 mb-2">{game.date}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-md font-semibold text-teal-500 mb-1">
                    {game.homeTeam} vs {game.awayTeam}
                  </h4>
                  <p className="text-purple-400 mb-1">
                    Prediction: {game.prediction}
                  </p>
                  <p className={`text-sm ${getStatusStyle(game.status)} mb-1`}>
                    Status: {game.status}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-green-600 mb-1">Home: {game.homeOdd}</p>
                  <p className="text-blue-600 mb-1">Draw: {game.drawOdd}</p>
                  <p className="text-teal-800 mb-1">Away: {game.awayOdd}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="p-4 text-center text-lg font-bold text-teal-500">
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

export default RandomGameData;
