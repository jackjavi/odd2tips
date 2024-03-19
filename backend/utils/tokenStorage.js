const fs = require("fs");
const path = require("path");

const tokenFile = path.join(__dirname, "tokens.json");

const saveToken = (userId, token) => {
  const tokens = JSON.parse(
    fs.readFileSync(tokenFile, { encoding: "utf-8" }) || "{}"
  );
  tokens[userId] = token;
  fs.writeFileSync(tokenFile, JSON.stringify(tokens, null, 2));
};

const getToken = (userId) => {
  const tokens = JSON.parse(
    fs.readFileSync(tokenFile, { encoding: "utf-8" }) || "{}"
  );
  return tokens[userId];
};

module.exports = { saveToken, getToken };
