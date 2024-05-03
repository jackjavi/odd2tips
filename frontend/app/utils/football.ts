export type Fixture = {
  _id: string;
  league: string;
  time: string;
  fullDate: string;
  teamOne: string;
  teamTwo: string;
  matchId: string;
  location: string;
  status: string;
};

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
