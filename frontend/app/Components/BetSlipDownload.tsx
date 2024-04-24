import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { format, set } from "date-fns";
import * as htmlToImage from "html-to-image";
import { GameData } from "@/interfaces/gameDataLS";
import { useRouter } from "next/navigation";
import { te } from "date-fns/locale";

const Daily2Odds: React.FC = () => {
  const [games, setGames] = useState<GameData[]>([]);
  const [loading, setLoading] = useState(true);
  const [colorSettings, setColorSettings] = useState({
    titleColor: "#333",
    timeColor: "#333",
    oddsColor: "#333",
    totalOddsColor: "#5e17eb",
    backgroundColor: "#f8f9fa",
    brand: "#5e17eb",
  });

  const ref = useRef<HTMLDivElement>(null);

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

  const handleColorChange = (colorType: string, color: string) => {
    setColorSettings((prevSettings) => ({
      ...prevSettings,
      [colorType]: color,
    }));
  };

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
        const currentTimestamp = format(new Date(), "yyyy MM dd_HH:mm:ss");
        const link = document.createElement("a");
        link.download = `odd2tips.com.${currentTimestamp}.png`;
        link.href = dataUrl;
        link.click();
      }
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  };

  const deleteBetslip = async () => {
    try {
      localStorage.removeItem("betslip");
      alert(
        "Betslip deleted successfully. Reload page if still visible on dashboard."
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-semibold text-center mb-5">
        Download Betslip
      </h2>
      <div className="flex flex-wrap justify-between text-sm md:text-md font-playfair mb-10">
        <div className="flex flex-col">
          <label>Title</label>
          <input
            type="color"
            value={colorSettings.titleColor}
            onChange={(e) => handleColorChange("titleColor", e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label>Time</label>
          <input
            type="color"
            value={colorSettings.timeColor}
            onChange={(e) => handleColorChange("timeColor", e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label>Odds</label>
          <input
            type="color"
            value={colorSettings.oddsColor}
            onChange={(e) => handleColorChange("oddsColor", e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label>Total Odds</label>
          <input
            type="color"
            value={colorSettings.totalOddsColor}
            onChange={(e) =>
              handleColorChange("totalOddsColor", e.target.value)
            }
          />
        </div>
        <div className="flex flex-col">
          <label>Background</label>
          <input
            type="color"
            value={colorSettings.backgroundColor}
            onChange={(e) =>
              handleColorChange("backgroundColor", e.target.value)
            }
          />
        </div>
        <div className="flex flex-col">
          <label>Brand</label>
          <input
            type="color"
            value={colorSettings.brand}
            onChange={(e) => handleColorChange("brand", e.target.value)}
          />
        </div>
      </div>

      <div
        ref={ref}
        className=" p-4  shadow-lg divide-y divide-gray-200 w-full "
        style={{
          fontFamily:
            "Arial, sans-serif backgroundColor: colorSettings.backgroundColor",
          backgroundColor: colorSettings.backgroundColor,
        }}
      >
        {games.length < 1 && (
          <h2 className="text-red-500">
            Create slip before attempting to download...
          </h2>
        )}
        {games.map((game, index) => (
          <div
            key={index}
            className="py-3 first:pt-0 last:pb-0 flex justify-between items-center"
            style={{
              color: colorSettings.backgroundColor,
            }}
          >
            <div>
              <span
                className="block text-xs font-bold "
                style={{ color: colorSettings.timeColor }}
              >
                {formatDate(game.startTime)}
              </span>
              <span
                className="block text-xs"
                style={{ color: colorSettings.titleColor }}
              >
                {game.gameTitle}
              </span>
            </div>
            <div className="text-right">
              <span
                className="block text-sm font-bold "
                style={{ color: colorSettings.brand }}
              >
                {game.predictionType}
              </span>
              <span
                className="block text-xs "
                style={{ color: colorSettings.titleColor }}
              >
                {game.homeTeam} vs {game.awayTeam}
              </span>
              <span
                className="block text-xs font-bold "
                style={{ color: colorSettings.oddsColor }}
              >
                {game.prediction} @ {game.odd.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
        <div className="pt-3 text-right">
          <span
            className="text-sm font-bold "
            style={{ color: colorSettings.totalOddsColor }}
          >
            Total Odds:
          </span>
          <span className="text-sm font-bold text-[#5e17eb] ml-1">
            {totalOdds.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="flex">
        <button
          onClick={downloadImage}
          className="mt-4 mr-4 px-6 py-2 bg-[#5e17eb] text-white rounded font-bold text-sm hover:bg-teal-700"
        >
          Download as PNG
        </button>
        <button
          onClick={deleteBetslip}
          className="mt-4 mr-4 px-6 py-2 bg-[#5e17eb] text-white rounded font-bold text-sm hover:bg-teal-700"
        >
          Delete Betslip
        </button>
      </div>
    </>
  );
};

export default Daily2Odds;
