import { TwitterApi } from "twitter-api-v2";
import dotenv from "dotenv";

dotenv.config();

const twitterClient = new TwitterApi({
  clientId: "cjAzTDByQXR3Ylpxc1d6U0RRYS06MTpjaQ",
  clientSecret: "kW2QyaZYKANnWgBYTXKhfeCsAEyKOoGcMRDi2lgI3Vo8blyS9x",
  accessToken: "3427743520-m0BaVUrrhgi2J95i5yzMKNtcT1FsV4raxj04Gic",
  accessSecret: "LIB4HutbhOk2V2k9cDnqBLLGCYPohoSuMw07W5r5J9LP7",
});

export default twitterClient;
