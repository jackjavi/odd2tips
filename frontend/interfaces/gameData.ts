export type GameData = {
  _id?: string;
  gameTitle: string;
  predictionType: string;
  startTime: string;
  homeTeam: string;
  awayTeam: string;
  prediction: string;
  odd: number;
  roomId: string | null;
};
