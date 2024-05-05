const axios = require("axios");
const cheerio = require("cheerio");
const Result = require("../models/Result");
const Fixtures = require("../models/Fixtures");
const Prediction = require("../models/Prediction");
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

    // First, delete all existing fixtures
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

    // Wait for all fixtures to be saved
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
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"
    );

    await page.goto("https://www.predictz.com/predictions/today", {
      waitUntil: "networkidle0",
    });

    const predictionsData = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll(".pttr.ptcnt")); // Select all match rows
      return rows.map((row) => {
        const matchUrl = row.querySelector(".pttd.ptclick .btntsm")
          ? row.querySelector(".pttd.ptclick .btntsm").href
          : null;

        // Extracting country and competition names from the URL
        let countryName = "Unknown Country";
        let competitionName = "Unknown Competition";
        if (matchUrl) {
          const pathSegments = new URL(matchUrl).pathname.split("/");
          if (pathSegments.length >= 3) {
            countryName = pathSegments[2]; // Country name is typically the third segment
            competitionName = pathSegments[3]; // Competition name is typically the fourth segment
          }
        }

        const homeTeam = row.querySelector(".pttd.ptmobh")
          ? row.querySelector(".pttd.ptmobh").innerText.trim()
          : null;
        const awayTeam = row.querySelector(".pttd.ptmoba")
          ? row.querySelector(".pttd.ptmoba").innerText.trim()
          : null;
        const odds = Array.from(row.querySelectorAll(".pttd.ptodds a")).map(
          (link) => link.innerText.trim()
        );
        const last5home = Array.from(
          row.querySelector(".ptlast5wh .last5box").children
        ).map((el) => el.innerText.trim());
        const last5away = Array.from(
          row.querySelector(".ptlast5wa .last5box").children
        ).map((el) => el.innerText.trim());
        const prediction = row.querySelector(".pttd.ptprd .ptpredboxsml")
          ? row.querySelector(".pttd.ptprd .ptpredboxsml").innerText.trim()
          : null;
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
          odds,
          date,
        };
      });
    });

    const predictions = await Promise.all(
      predictionsData.map(async (data) => {
        const exists = await Prediction.findOne({
          homeTeam: data.homeTeam,
          awayTeam: data.awayTeam,
          date: data.date,
        });

        if (!exists) {
          const prediction = new Prediction(data);
          return prediction.save();
        } else {
          return exists;
        }
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
