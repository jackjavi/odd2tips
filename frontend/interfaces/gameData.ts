export type GameData = {
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
  status: string;
};
