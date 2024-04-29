const axios = require("axios");
const cheerio = require("cheerio");
const Result = require("../models/Result");

exports.scrapedData = async (req, res) => {
  try {
    console.log("Scraping Data...");
    const response = await axios.get(
      "https://www.skysports.com/football-fixtures"
    );
    const html = response.data;
    const $ = cheerio.load(html);

    const fixtures = [];

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

      fixtures.push({ fullDate, teamOne, teamTwo, matchId });
    });

    res.status(200).json({ fixtures });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.fetchFootballResults = async (req, res) => {
  try {
    console.log("Fetching Football Results...");

    const response = await axios.get(
      "https://www.skysports.com/football-results"
    );
    const html = response.data;
    const $ = cheerio.load(html);

    const resultPromises = [];

    $(".fixres__item").each((index, element) => {
      const date =
        $(element).prevAll(".fixres__header2:first").text().trim() +
        " " +
        $(element).prevAll(".fixres__header3:first").text().trim();
      const league = $(element).prevAll(".fixres__header1:first").text().trim();
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

      resultPromises.push(
        Result.findOne({
          "teamOne.name": teamOneName,
          "teamTwo.name": teamTwoName,
          date: date,
        }).then((existingResult) => {
          if (existingResult) {
            /*console.log(
              `Result for ${teamOneName} vs ${teamTwoName} on ${date} already exists.`
            );*/
            return null;
          } else {
            const newResult = new Result({
              date,
              league,
              teamOne: { name: teamOneName, score: scoreOne },
              teamTwo: { name: teamTwoName, score: scoreTwo },
            });
            return newResult.save();
          }
        })
      );
    });

    const savedResults = await Promise.all(resultPromises);
    const filteredResults = savedResults.filter((result) => result !== null);

    res.status(200).json({ results: filteredResults });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
