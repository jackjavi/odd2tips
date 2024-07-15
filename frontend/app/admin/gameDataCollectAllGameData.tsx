import React from "react";
import { gameDataCollectAllGames } from "../utils/football";
import AdminGameData from "./AdminGameData";

const GameDataCollectAllGameData: React.FC = async () => {
  const games = await gameDataCollectAllGames();

  return (
    <>
      <AdminGameData games={games} />
    </>
  );
};

export default GameDataCollectAllGameData;
