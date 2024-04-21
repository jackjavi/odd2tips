import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { format, set } from "date-fns";
import * as htmlToImage from "html-to-image";
import Loading from "./Loading";
import { GameData } from "@/interfaces/gameDataLS";
import { useRouter } from "next/navigation";

const Daily2Odds: React.FC = () => {
  const [games, setGames] = useState<GameData[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const betslip = localStorage.getItem("betslip");
        if (betslip) {
          const betslipData = JSON.parse(betslip);
          setGames(Array.isArray(betslipData) ? betslipData : [betslipData]);
        }
      } catch (error) {
        console.error("Failed to fetch games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  const formatDate = (dateString: string | null): string => {
    if (!dateString) {
      return "Invalid date";
    }

    try {
      const date = new Date(dateString);
      const localDate = new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
      );

      return format(localDate, "MMM d, p");
    } catch (error) {
      console.error("Invalid date:", dateString);
      return "Invalid date";
    }
  };

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
      localStorage.removeItem("betslip");
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  };

  const deleteBetslip = async () => {
    try {
      localStorage.removeItem("betslip");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        ref={ref}
        className="bg-[whitesmoke] p-4  shadow-lg divide-y divide-gray-200 w-full"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        {games.map((game, index) => (
          <div
            key={index}
            className="py-3 first:pt-0 last:pb-0 flex justify-between items-center"
            style={{ background: index % 2 === 0 ? "#f8f9fa" : "#e9ecef" }}
          >
            <div>
              <span className="block text-xs font-bold text-slate-500">
                {formatDate(game.startTime)}
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
      <div className="flex">
        <button
          onClick={downloadImage}
          className="mt-4 mr-4 px-6 py-2 bg-[#5e17eb] text-white rounded font-bold text-sm hover:bg-[#4e12cb]"
        >
          Download as PNG
        </button>
        <button
          onClick={deleteBetslip}
          className="mt-4 mr-4 px-6 py-2 bg-[#5e17eb] text-white rounded font-bold text-sm hover:bg-[#4e12cb]"
        >
          Delete Betslip
        </button>
      </div>
    </>
  );
};

export default Daily2Odds;
