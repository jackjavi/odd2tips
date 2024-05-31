import React from "react";
import { gameDataCollectAllGames } from "../utils/football";

const GameDataCollectAllGameData: React.FC = async () => {
  const games = await gameDataCollectAllGames();

  return (
    <>
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
                <div className="md:grid md:grid-cols-3 gap-4 my-2 flex flex-col">
                  <div className="col-span-1 flex flex-col items-center">
                    <h4 className="text-md font-semibold">{game.homeTeam}</h4>
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
                    <p className="text-gray-500">
                      Prediction: {game.prediction}
                    </p>
                  </div>
                  <div className="col-span-1 flex flex-col items-center">
                    <h4 className="text-md font-semibold">{game.awayTeam}</h4>
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
          </>
        )}
      </div>
    </>
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

export default GameDataCollectAllGameData;
