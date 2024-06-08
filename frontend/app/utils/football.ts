import { Fixture } from "../../interfaces/Fixture";
import { Result } from "../../interfaces/Result";
import { Prediction } from "../../interfaces/Prediction";
import { GameData } from "../../interfaces/gameData";

// const BASE_URL = "http://localhost:8888";
const BASE_URL = "https://odd2tips.onrender.com";

export async function fetchFixtures(): Promise<Fixture[]> {
  try {
    const response = await fetch(`${BASE_URL}/api/football/fixtures`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch fixtures");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching fixtures:", error);
    throw error;
  }
}

export async function fetchResults(): Promise<Result[]> {
  try {
    const response = await fetch(`${BASE_URL}/api/football/get-results`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch results");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching results:", error);
    throw error;
  }
}

export async function fetchScrapedFixtures(): Promise<Fixture[]> {
  try {
    const response = await fetch(`${BASE_URL}/api/scrapedData/fixtures`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch scraped fixtures");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching scraped fixtures:", error);
    throw error;
  }
}

export async function fetchScrapedResults(): Promise<Result[]> {
  try {
    const response = await fetch(`${BASE_URL}/api/scrapedData/results`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch scraped results");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching scraped results:", error);
    throw error;
  }
}

export async function fetchScrapedPredictions(): Promise<Prediction[]> {
  try {
    const response = await fetch(`${BASE_URL}/api/scrapedData/predictions`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch scraped predictions");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching scraped predictions:", error);
    throw error;
  }
}

export async function createRoomHistory(): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/api/football/create-history`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to create room history");
    }
  } catch (error) {
    console.error("Error creating room history:", error);
    throw error;
  }
}

export async function fetchPredictzResults(): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/api/football/results-predictz`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch predictz results");
    }
  } catch (error) {
    console.error("Error fetching predictz results:", error);
    throw error;
  }
}

export async function analyzeFootballResults(): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/api/football/analyze-results`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to analyze results");
    }
  } catch (error) {
    console.error("Error analyzing results:", error);
    throw error;
  }
}

export async function allocateFixturesToRooms(): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/api/football/predictz`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to allocate fixtures to rooms");
    }
  } catch (error) {
    console.error("Error allocating fixtures to rooms:", error);
    throw error;
  }
}

export async function gameDataCollectAllGames(): Promise<GameData[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/api/games/gameDataCollectAllGameData`,
      { cache: "no-store" }
    );
    if (!response.ok) {
      throw new Error("Failed to allocate fixtures to rooms");
    }
    return response.json();
  } catch (error) {
    console.error("Error allocating fixtures to rooms:", error);
    throw error;
  }
}

export async function fetchRandomGameData(): Promise<GameData[]> {
  try {
    const response = await fetch(`${BASE_URL}/api/games/randomGameData`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch random game data");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching random game data:", error);
    throw error;
  }
}
