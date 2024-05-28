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
    let newTotalOdds = 1;
    games.forEach((game) => {
      switch (game.prediction) {
        case "Home win":
          if (parseFloat(game.homeOdd) !== 0) {
            newTotalOdds *= parseFloat(game.homeOdd);
          }
          break;
        case "Away win":
          if (parseFloat(game.awayOdd) !== 0) {
            newTotalOdds *= parseFloat(game.awayOdd);
          }
          break;
        case "Draw":
          if (parseFloat(game.drawOdd) !== 0) {
            newTotalOdds *= parseFloat(game.drawOdd);
          }
          break;
        default:
          break;
      }
    });
    setTotalOdds(newTotalOdds);
  };

  if (loading) return <Loading />;

  if (games.length === 0) {
    return <></>;
  }

  return (
    <div className="w-[90vw] md:w-[80vw] px-4 mx-auto bg-slate-800 shadow rounded-lg overflow-hidden">
      <h2 className="md:text-3xl text-xl font-bold text-center text-teal-600 mt-8 mb-6">
        RANDOMLY FEATURED TIPSTER
      </h2>
      <h3 className="md:text-lg text-md font-bold text-center text-gray-800 mb-6 font-playfair">
        Tipster Room - {games[0] && games[0].roomTitle}
      </h3>
      {games.length === 0 ? (
        <div className="p-6 text-center text-lg font-medium text-teal-500">
          No games available. Please check back later.
        </div>
      ) : (
        <>
          {games.length > 0 &&
            games.map((game) => (
              <div
                key={game._id}
                className="p-4 border-b border-gray-200 last:border-b-0"
              >
                <h3 className="text-xl font-semibold text-purple-600 mb-2">
                  {game.gameTitle}
                </h3>
                <p className="text-teal-500 mb-2">{game.date}</p>
                <div className="md:grid md:grid-cols-3 gap-4 my-2 flex flex-col">
                  <div className="col-span-1 flex flex-col items-center">
                    <h4 className="text-md text-white font-semibold">
                      {game.homeTeam}
                    </h4>
                    <div className="flex justify-center">
                      {game.last5home.map((result, index) => (
                        <span
                          key={index}
                          className={`result ${
                            result === "W"
                              ? "bg-green-500"
                              : result === "L"
                              ? "bg-red-500"
                              : "bg-blue-500"
                          } rounded-md text-white px-2 py-1 mx-1`}
                        >
                          {result}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-1 flex justify-center items-center">
                    <p className="text-gray-300">
                      Prediction: {game.prediction}
                    </p>
                  </div>
                  <div className="col-span-1 flex flex-col items-center">
                    <h4 className="text-md text-white font-semibold">
                      {game.awayTeam}
                    </h4>
                    <div className="flex justify-center">
                      {game.last5away.map((result, index) => (
                        <span
                          key={index}
                          className={`result ${
                            result === "W"
                              ? "bg-green-500"
                              : result === "L"
                              ? "bg-red-500"
                              : "bg-blue-500"
                          } rounded-md text-white px-2 py-1 mx-1`}
                        >
                          {result}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className={`text-sm ${getStatusStyle(game.status)}`}>
                  {game.status}
                </p>
                <div className="text-right">
                  <p className="text-green-600">Home: {game.homeOdd}</p>
                  <p className="text-blue-600">Draw: {game.drawOdd}</p>
                  <p className="text-red-600">Away: {game.awayOdd}</p>
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
