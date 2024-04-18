import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { format } from "date-fns";
import * as htmlToImage from "html-to-image";

interface GameData {
  _id: string;
  gameTitle: string;
  predictionType: string;
  startTime: string;
  homeTeam: string;
  awayTeam: string;
  prediction: string;
  odd: number;
  roomId: string;
}

interface Daily2OddsProps {
  roomId: string | null;
}

const Daily2Odds: React.FC<Daily2OddsProps> = ({ roomId }) => {
  const [games, setGames] = useState<GameData[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const { data } = await axios.get<GameData[]>(
          `/api/games/gameDataCollect?roomId=${roomId}`
        );
        setGames(data);
      } catch (error) {
        console.error("Failed to fetch games:", error);
      }
    };

    fetchGames();
  }, [roomId]);

  const totalOdds = games.reduce((acc, game) => acc * game.odd, 1);

  const downloadImage = async () => {
    try {
      const node = ref.current;

      if (node) {
        const dataUrl = await htmlToImage.toPng(node);
        const link = document.createElement("a");
        link.download = "daily2odds.png";
        link.href = dataUrl;
        link.click();
      }
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  };

  return (
    <>
      <div
        ref={ref}
        className="bg-gradient-to-r from-purple-500 via-purple-600 to-green-500 p-4 rounded-lg shadow-lg"
      >
        {games.map((game) => (
          <div
            key={game._id}
            className="border-b border-slate-300 p-4 hover:bg-purple-700 hover:text-white hover:bg-opacity-25 transition-colors rounded-lg mb-4"
          >
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-center mb-4">
                {game.predictionType.toUpperCase()}
              </h2>
              <span className="text-lg font-semibold">{game.gameTitle}</span>
              <span className="ml-4 text-sm font-medium text-slate-500">
                {format(new Date(game.startTime), "MMMM d, p")}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <span className="font-semibold">{game.homeTeam}</span>
                <span className="mx-2">vs</span>
                <span className="font-semibold">{game.awayTeam}</span>
              </div>
              <div>
                <span className="text-sm bg-green-400 text-slate-800 py-1 px-3 rounded-full">
                  {`${game.prediction} @ ${game.odd.toFixed(2)}`}
                </span>
              </div>
            </div>
          </div>
        ))}
        <div className="mt-4 p-4 text-right">
          <span className="text-lg font-bold">Total Odds:</span>
          <span className="text-lg text-green-200 ml-2">
            {totalOdds.toFixed(2)}
          </span>
        </div>
      </div>
      <button
        onClick={downloadImage}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mr-4"
      >
        Download as PNG
      </button>
    </>
  );
};

export default Daily2Odds;
