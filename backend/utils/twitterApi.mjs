import { TwitterApi } from "twitter-api-v2";
import dotenv from "dotenv";
import redisClient from "./redis.mjs";

dotenv.config();

const twitterClient = new TwitterApi({
  clientId: process.env.TWITTERCLIENTID,
  clientSecret: process.env.TWITTERCLIENTSECRET,
  accessToken: process.env.TWITTERACCESSTOKEN,
  accessSecret: process.env.TWITTERACCESSSECRET,
});

try {
  //const currentUser = await twitterClient.v2.me();
  //console.log("Current user:", currentUser.data);

  // Don't forget to specify 'offline.access' in scope list if you want to refresh your token later
  const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(
    process.env.TWITTERREDIRECTURL,
    { scope: ["tweet.read", "users.read", "users.write", "offline.access"] }
  );

  await redisClient.setTwitterAuth(url, codeVerifier, state);

  // Redirect your user to {url}, store {state} and {codeVerifier} into a DB/Redis/memory after user redirection

  const res = await twitterClient.v2.tweet({
    text: "My tweet from the Twitter API v2! 🎉",
  });
  console.log(res.data);
} catch (error) {
  console.error(error.message);
}

export default twitterClient;
