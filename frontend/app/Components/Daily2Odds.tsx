import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { format } from "date-fns";
import * as htmlToImage from "html-to-image";
import Loading from "./Loading";
import { fi } from "date-fns/locale";

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
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [roomId]);

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  const totalOdds = games.reduce((acc, game) => acc * game.odd, 1);

  const downloadImage = async () => {
    try {
      const node = ref.current;

      if (node) {
        const dataUrl = await htmlToImage.toPng(node);
        const currentTimestamp = format(new Date(), "yyyy MM dd_HH:mm:ss");
        const link = document.createElement("a");
        link.download = `${
          roomTitle || "default"
        }.odd2tips.com.${currentTimestamp}.png`;
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
        className="bg-white p-4  shadow-lg divide-y divide-gray-200"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        {games.map((game, index) => (
          <div
            key={game._id}
            className="py-3 first:pt-0 last:pb-0 flex justify-between items-center"
            style={{ background: index % 2 === 0 ? "#f8f9fa" : "#e9ecef" }}
          >
            <div>
              <span className="block text-xs font-bold text-slate-500">
                {format(new Date(game.startTime), "MMM d, p")}
              </span>
              <span className="block text-xs text-slate-500">
                {game.gameTitle}
              </span>
            </div>
            <div className="text-right">
              <span className="block text-sm font-bold text-[#5e17eb]">
                {game.predictionType}
              </span>
              <span className="block text-xs text-slate-500">
                {game.homeTeam} vs {game.awayTeam}
              </span>
              <span className="block text-xs font-bold text-slate-500">
                {game.prediction} @ {game.odd.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
        <div className="pt-3 text-right">
          <span className="text-sm font-bold text-slate-500">Total Odds:</span>
          <span className="text-sm font-bold text-[#5e17eb] ml-1">
            {totalOdds.toFixed(2)}
          </span>
        </div>
      </div>
      <button
        onClick={downloadImage}
        className="mt-4 mr-4 px-6 py-2 bg-[#5e17eb] text-white rounded font-bold text-sm hover:bg-[#4e12cb]"
      >
        Download as PNG
      </button>
    </>
  );
};

export default Daily2Odds;
