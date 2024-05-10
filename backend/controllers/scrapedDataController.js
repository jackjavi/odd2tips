const axios = require("axios");
const cheerio = require("cheerio");
const Result = require("../models/Result");
const Fixtures = require("../models/Fixtures");
const Prediction = require("../models/Prediction");
const PredictzResults = require("../models/PredictzResults");
const puppeteer = require("puppeteer");

exports.fetchFootballResults = async (req, res) => {
  try {
    console.log("Fetching Football Results...");

    const response = await axios.get(
      "https://www.skysports.com/football-results"
    );
    const html = response.data;
    const $ = cheerio.load(html);

    await Result.deleteMany({});

    const results = [];

    $(".fixres__item").each((index, element) => {
      const date =
        $(element).prevAll(".fixres__header1:first").text().trim() +
        " " +
        $(element).prevAll(".fixres__header2:first").text().trim();
      const league = $(element).prevAll(".fixres__header3:first").text().trim();
      const teamOneName = $(element)
        .find(".matches__participant--side1 .swap-text__target")
        .text()
        .trim();
      const teamTwoName = $(element)
        .find(".matches__participant--side2 .swap-text__target")
        .text()
        .trim();
      const resultText = $(element).find(".matches__teamscores").text();
      const resultSplit = resultText
        .split("\n")
        .map((score) => score.trim())
        .filter((score) => score !== "");
      const scoreOne = resultSplit[0];
      const scoreTwo = resultSplit[1];

      results.push({
        date,
        league,
        teamOne: { name: teamOneName, score: scoreOne },
        teamTwo: { name: teamTwoName, score: scoreTwo },
      });
    });

    await Result.insertMany(results);

    res
      .status(200)
      .json({ message: "Football results fetched and stored successfully." });
  } catch (error) {
    console.error("Error fetching football results:", error);
    res.status(500).json({
      message: "Failed to fetch football results",
      error: error.message,
    });
  }
};

exports.fetchFootballFixtures = async (req, res) => {
  try {
    console.log("Fetching Football Fixtures...");

    await Fixtures.deleteMany({});

    const response = await axios.get(
      "https://www.skysports.com/football-fixtures"
    );
    const html = response.data;
    const $ = cheerio.load(html);

    const fixturesToSave = [];

    $(".fixres__item").each((index, element) => {
      const header1 = $(element)
        .prevAll(".fixres__header1:first")
        .text()
        .trim();
      const header2 = $(element)
        .prevAll(".fixres__header2:first")
        .text()
        .trim();
      const fullDate = `${header1} ${header2}`;
      const teamOne = $(element)
        .find(".matches__participant--side1 .swap-text__target")
        .text()
        .trim();
      const teamTwo = $(element)
        .find(".matches__participant--side2 .swap-text__target")
        .text()
        .trim();
      const matchId = $(element).attr("data-item-id");
      const time = $(element).find(".matches__date").text().trim();
      const league = $(element).prevAll(".fixres__header3:first").text().trim();
      const location = $(element).find(".matches__item").attr("data-location");
      const status = $(element).find(".matches__item").attr("data-status");

      const fixtureData = new Fixtures({
        fullDate,
        teamOne,
        teamTwo,
        time,
        league,
        location,
        status,
        matchId,
      });

      fixturesToSave.push(fixtureData.save());
    });

    await Promise.all(fixturesToSave);

    console.log("All fixtures have been successfully updated.");
    res.status(200).send("Fixtures updated successfully.");
  } catch (error) {
    console.error("Error fetching fixtures:", error);
    res.status(500).send("Server Error: " + error.message);
  }
};

exports.fetchFootballNews = async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));
    await page
      .goto("https://www.skysports.com/football/news", {
        waitUntil: "networkidle0",
        timeout: 0,
      })
      .catch((e) => console.log("Navigation error:", e));
    await page.waitForSelector(".sdc-site-tile--item", { timeout: 30000 });

    const newsItems = await page.evaluate(() => {
      const items = [];
      document.querySelectorAll(".sdc-site-tile--item").forEach((el) => {
        const title = el
          .querySelector(".sdc-site-tile__headline-text")
          ?.textContent.trim();
        const link = el.querySelector(".sdc-site-tile__headline-link")?.href;
        const imageUrl = el.querySelector("img")?.src;
        items.push({ title, link, imageUrl });
      });
      return items;
    });

    await browser.close();
    res.status(200).json({ newsItems });
  } catch (error) {
    console.error("Error fetching football news:", error);
    await browser?.close();
    res
      .status(500)
      .json({ message: "Failed to fetch football news", error: error.message });
  }
};

exports.scrapePredictions = async (req, res) => {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: true });

    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/LATEST.0.0.0 Safari/537.36"
    );

    await page.goto("https://www.predictz.com/predictions/today", {
      waitUntil: "networkidle0",
    });

    await Prediction.deleteMany({});

    const predictionsData = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll(".pttr.ptcnt"));
      return rows
        .map((row) => {
          const matchUrl = row.querySelector(".pttd.ptclick .btntsm")
            ? row.querySelector(".pttd.ptclick .btntsm").href
            : null;

          let countryName = "Unknown Country";
          let competitionName = "Unknown Competition";
          if (matchUrl) {
            const pathSegments = new URL(matchUrl).pathname.split("/");
            if (pathSegments.length >= 3) {
              countryName = pathSegments[2];
              competitionName = pathSegments[3];
            }
          }

          const homeTeamElement = row.querySelector(".pttd.ptmobh");
          const awayTeamElement = row.querySelector(".pttd.ptmoba");
          const oddsElements = Array.from(
            row.querySelectorAll(".pttd.ptodds a")
          );

          if (!homeTeamElement || !awayTeamElement || oddsElements.length < 3) {
            return null;
          }

          const homeTeam = homeTeamElement.innerText.trim();
          const awayTeam = awayTeamElement.innerText.trim();
          const odds = oddsElements.map((link) => link.innerText.trim());

          let homeOdd = parseFloat(odds[0] || "0");
          let drawOdd = parseFloat(odds[1] || "0");
          let awayOdd = parseFloat(odds[2] || "0");

          const last5home = Array.from(
            row.querySelector(".ptlast5wh .last5box").children
          ).map((el) => el.innerText.trim());
          const last5away = Array.from(
            row.querySelector(".ptlast5wa .last5box").children
          ).map((el) => el.innerText.trim());
          let predictionRaw = row.querySelector(".pttd.ptprd .ptpredboxsml")
            ? row.querySelector(".pttd.ptprd .ptpredboxsml").innerText.trim()
            : null;

          let prediction;
          if (predictionRaw.includes("Home")) {
            prediction = "Home win";
          } else if (predictionRaw.includes("Away")) {
            prediction = "Away win";
          } else if (predictionRaw.includes("Draw")) {
            prediction = "Draw";
          } else {
            prediction = "Unknown";
          }

          const date = document
            .querySelector(".bclink li:last-child")
            ?.innerText.trim()
            .replace("Today - ", "");

          return {
            countryName,
            competitionName,
            homeTeam,
            awayTeam,
            last5home,
            last5away,
            prediction,
            matchUrl,
            homeOdd,
            drawOdd,
            awayOdd,
            date,
          };
        })
        .filter(Boolean);
    });

    const predictions = await Promise.all(
      predictionsData.map((data) => {
        const prediction = new Prediction(data);
        return prediction.save();
      })
    );

    res.status(200).json({ predictions });
  } catch (error) {
    console.error("Error fetching predictions:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch predictions", error: error.message });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

exports.fetchPredictzResults = async (req, res) => {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"
    );

    async function fetchResults(url) {
      await page.goto(url, { waitUntil: "networkidle0" });
      return page.evaluate(() => {
        return Array.from(document.querySelectorAll("table.pztable tr")).map(
          (row) => {
            const league = row.querySelector("td a")
              ? row.querySelector("td a").innerText.trim()
              : "Unknown League";
            const matchUrl = row.querySelector("td a")
              ? row.querySelector("td a").href
              : null;
            const teamsScores = row.querySelectorAll("td")[3]
              ? row.querySelectorAll("td")[3].innerText.trim()
              : "Unknown";

            const matchPattern = /^(.*?)\s(\d+)\s(.*?)\s(\d+)$/;
            const match = teamsScores.match(matchPattern);
            const teamOne = match ? match[1] : "Unknown Team One";
            const scoreOne = match ? match[2] : "0";
            const teamTwo = match ? match[3] : "Unknown Team Two";
            const scoreTwo = match ? match[4] : "0";

            let status = "Draw";
            if (parseInt(scoreOne) > parseInt(scoreTwo)) status = "Home win";
            else if (parseInt(scoreTwo) > parseInt(scoreOne))
              status = "Away win";

            return {
              league,
              matchUrl,
              teamOne,
              scoreOne,
              teamTwo,
              scoreTwo,
              status,
            };
          }
        );
      });
    }

    const yesterdayResults = await fetchResults(
      "https://www.predictz.com/results/yesterday"
    );
    const todayResults = await fetchResults(
      "https://www.predictz.com/results/"
    );

    const combinedResults = yesterdayResults.concat(todayResults);

    await PredictzResults.deleteMany({});
    await PredictzResults.insertMany(combinedResults);

    res.status(200).json({
      message:
        "Results for yesterday and today fetched and stored successfully.",
    });
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).json({
      message: "Failed to fetch results",
      error: error.message,
    });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
