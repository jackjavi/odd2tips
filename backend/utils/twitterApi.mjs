import { TwitterApi } from "twitter-api-v2";
import dotenv from "dotenv";

dotenv.config();

const twitterClient = new TwitterApi({
  clientId: process.env.TWITTERCLIENTID,
  clientSecret: process.env.TWITTERCLIENTSECRET,
  accessToken: process.env.TWITTERACCESSTOKEN,
  accessSecret: process.env.TWITTERACCESSSECRET,
});

export default twitterClient;
