import twitterClient from "../utils/twitterApi.mjs";

const getTweets = async (query) => {
  const result = await twitterClient.v2.get("tweets/search/recent", {
    query,
    max_results: 100,
  });
  return result.data;
};

export { getTweets };
