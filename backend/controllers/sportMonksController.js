const axios = require("axios");

exports.getFixtures = async (req, res) => {
  const apiToken = process.env.SPORTMONKS_API_TOKEN;

  if (!apiToken) {
    console.error("Error: Missing Sportmonks API token");
    return res.status(500).json({ message: "Missing API token" });
  }

  try {
    const response = await axios.get(
      `https://api.sportmonks.com/v3/football/fixtures?api_token=${apiToken}`
    );
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from Sportmonks:", error);
    res.status(500).json({ message: "Failed to fetch data" });
  }
};
