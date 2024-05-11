const callbackcontroller = async (req, res) => {
  const { state, code } = req.query;

  // Get the saved codeVerifier from session
  const { codeVerifier, state: sessionState } = req.session;

  if (!codeVerifier || !state || !sessionState || !code) {
    return res.status(400).send("You denied the app or your session expired!");
  }
  if (state !== sessionState) {
    return res.status(400).send("Stored tokens didnt match!");
  }

  // Obtain access token
  const twitterClient = new TwitterApi({
    clientId: "cjAzTDByQXR3Ylpxc1d6U0RRYS06MTpjaQ",
    clientSecret: "kW2QyaZYKANnWgBYTXKhfeCsAEyKOoGcMRDi2lgI3Vo8blyS9x",
  });

  twitterClient
    .loginWithOAuth2({ code, codeVerifier, redirectUri: CALLBACK_URL })
    .then(
      async ({
        client: loggedClient,
        accessToken,
        refreshToken,
        expiresIn,
      }) => {
        // {loggedClient} is an authenticated client in behalf of some user
        // Store {accessToken} somewhere, it will be valid until {expiresIn} is hit.
        // If you want to refresh your token later, store {refreshToken} (it is present if 'offline.access' has been given as scope)

        // Example request
        const { data: userObject } = await loggedClient.v2.me();
      }
    )
    .catch(() => res.status(403).send("Invalid verifier or access tokens!"));
};

export default callbackcontroller;
