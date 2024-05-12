import redisClient from "../../utils/redis.mjs";
import TwitterApi from "twitter-api-v2";

const FILE_PATH = "tokens.json"; // Path to the JSON file to store tokens

const callbackcontroller = async (req, res) => {
  console.log(process.env.TWITTERREDIRECTURL);
  // Extract state and code from query string
  const { state, code } = req.query;
  // Get the saved codeVerifier from Redis
  const { codeVerifier, state: storedState } =
    await redisClient.getTwitterAuth();

  if (!codeVerifier || !state || !storedState || !code) {
    return res.status(400).send("You denied the app or your session expired!");
  }
  if (state !== storedState) {
    return res.status(400).send("Stored tokens didnt match!");
  }

  // Obtain access token
  const client = new TwitterApi({
    clientId: process.env.TWITTERCLIENTID,
    clientSecret: process.env.TWITTERCLIENTSECRET,
  });

  client
    .loginWithOAuth2({
      code,
      codeVerifier,
      redirectUri: process.env.TWITTERREDIRECTURL,
    })
    .then(
      async ({
        client: loggedClient,
        accessToken,
        refreshToken,
        expiresIn,
      }) => {
        console.log("Logged in!");
        // Store tokens in a JSON file
        const tokens = {
          accessToken,
          refreshToken,
          expiresIn,
        };
        await fs.writeFile(FILE_PATH, JSON.stringify(tokens));

        // Example request
        const { data: userObject } = await loggedClient.v2.me();
      }
    )
    .catch(() => res.status(403).send("Invalid verifier or access tokens!"));
};

export default callbackcontroller;
