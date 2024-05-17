import { getTweets } from "../../services/twitterService.mjs";

const getTweetsController = async (req, res) => {
  const tweets = await getTweets();
  res.status(200).json(tweets);
};

export { getTweetsController };
