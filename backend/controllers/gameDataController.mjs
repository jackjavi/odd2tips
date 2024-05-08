import GameData from "../models/GameData.mjs";

const createGameData = async (req, res) => {
  try {
    const gameData = new GameData(req.body);
    await gameData.save();
    res.status(201).json(gameData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const editGameData = async (req, res) => {
  const { id: gameId } = req.params;

  try {
    const gameData = await GameData.findByIdAndUpdate(gameId, req.body, {
      new: true,
    });

    if (!gameData) {
      return res.status(404).json({ message: "GameData not found" });
    }

    res.json(gameData);
  } catch (error) {
    console.error("Error updating game data:", error);
    res.status(500).json({ message: "Failed to update game data" });
  }
};

const deleteGameData = async (req, res) => {
  const { id: gameId } = req.params;

  try {
    const gameData = await GameData.findByIdAndDelete(gameId);

    if (!gameData) {
      return res.status(404).json({ message: "GameData not found" });
    }

    res.json({ message: "GameData deleted successfully" });
  } catch (error) {
    console.error("Error deleting game data:", error);
    res.status(500).json({ message: "Failed to delete game data" });
  }
};

export { createGameData, editGameData, deleteGameData };
