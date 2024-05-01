import React, { useState, useEffect, useRef } from "react";
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
  odds: string[];
  countryName: string;
  roomId: string;
  date: string;
}

interface Daily2OddsProps {
  roomId: string | null;
  roomTitle: string | null;
}

const Daily2Odds: React.FC<Daily2OddsProps> = ({ roomId, roomTitle }) => {
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

  if (loading) return <Loading />;

  return (
    <div
      ref={ref}
      className="bg-white p-4 shadow-lg divide-y divide-gray-200"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      {games.length === 0 && (
        <div className="text-center text-lg text-slate-500">
          No games available for now in this room. Explore other rooms{" "}
          <a className="underline italic" href="/rooms">
            here
          </a>
          .
        </div>
      )}
      {games.map((game, index) => (
        <div
          key={game._id}
          className="py-3 first:pt-0 last:pb-0 flex justify-between items-center"
          style={{ background: index % 2 === 0 ? "#f8f9fa" : "#e9ecef" }}
        >
          <div>
            <span className="block text-xs text-slate-500">
              {game.gameTitle} - {game.countryName}
            </span>
          </div>
          <div className="text-right">
            <span className="block text-sm font-bold text-[#5e17eb]">
              {game.homeTeam} vs {game.awayTeam}
            </span>
            <span className="block text-xs font-bold text-slate-500">
              {game.prediction}
            </span>
            <span className="block text-xs text-slate-500">
              Odds: {game.odds.join(", ")}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Daily2Odds;
