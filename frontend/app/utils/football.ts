import { Fixture } from "../../interfaces/Fixture";
import { Result } from "../../interfaces/Result";
import { Prediction } from "../../interfaces/Prediction";

export async function fetchFixtures(): Promise<Fixture[]> {
  try {
    const response = await fetch("/api/football/fixtures");
    if (!response.ok) {
      throw new Error("Failed to fetch fixtures");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching fixtures:", error);
    throw error;
  }
}

export async function fetchScrapedFixtures(): Promise<Fixture[]> {
  try {
    const response = await fetch("/api/scrapedData/fixtures");
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
    const response = await fetch("/api/scrapedData/results");
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
    const response = await fetch("/api/scrapedData/predictions");
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
    const response = await fetch(`/api/football/create-history`);
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
    const response = await fetch("/api/football/results-predictz");
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
    const response = await fetch("/api/football/analyze-results");
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
    const response = await fetch("/api/football/predictz");
    if (!response.ok) {
      throw new Error("Failed to allocate fixtures to rooms");
    }
  } catch (error) {
    console.error("Error allocating fixtures to rooms:", error);
    throw error;
  }
}
