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
        className="bg-gradient-to-br from-purple-600 to-green-500 p-4 shadow-lg"
      >
        <h1 className="text-xl font-bold text-center text-white mb-2"></h1>
        {games.length > 0 ? (
          games.map((game, index) => (
            <div
              key={game._id}
              className={`p-2 mb-2 ${
                index % 2 === 0 ? "bg-purple-700" : "bg-purple-600"
              } rounded-lg`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs text-white">
                    {format(new Date(game.startTime), "MMM d, p")}
                  </span>
                  <div className="text-xs text-white mt-1">
                    {game.gameTitle}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-xs text-white">
                    {game.homeTeam} vs {game.awayTeam}
                  </div>
                  <div className="text-xs text-green-300">
                    {`${game.prediction} @ ${game.odd.toFixed(2)}`}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-white text-center">
            Be patient as the Room Admin updates today&apos;s games. Check out
            games in other rooms{" "}
            <a className="underline" href="/rooms">
              here
            </a>
          </div>
        )}
        <div className="mt-2 p-2 text-right bg-purple-800 rounded-lg">
          <span className="text-xs font-bold text-white">Total Odds:</span>
          <span className="text-xs text-green-300 ml-1">
            {totalOdds.toFixed(2)}
          </span>
        </div>
      </div>
      <button
        onClick={downloadImage}
        className="mt-3 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-bold mr-4"
      >
        Download as PNG
      </button>
    </>
  );
};

export default Daily2Odds;
