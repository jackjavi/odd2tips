const fs = require("fs");
const path = require("path");

const tokenFile = path.join(__dirname, "tokens.json");

const getToken = (userId) => {
  const tokens = JSON.parse(
    fs.readFileSync(tokenFile, { encoding: "utf-8" }) || "{}"
  );
  return tokens[userId];
};

const saveToken = (userId, token) => {
  const sessions = JSON.parse(
    fs.readFileSync(sessionsFile, { encoding: "utf-8" }) || "{}"
  );
  sessions[token] = userId; // Token as key, userId as value
  fs.writeFileSync(sessionsFile, JSON.stringify(sessions, null, 2));
};

// New method to get userId by token
const getUserIdByToken = (token) => {
  const sessions = JSON.parse(
    fs.readFileSync(sessionsFile, { encoding: "utf-8" }) || "{}"
  );
  return sessions[token]; // Return userId associated with the token
};

module.exports = { saveToken, getToken, getUserIdByToken };
