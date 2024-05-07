import { Fixture } from "../../interfaces/Fixture";

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

export async function fetchScrapedResults(): Promise<Fixture[]> {
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

export async function fetchScrapedPredictions(): Promise<Fixture[]> {
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
