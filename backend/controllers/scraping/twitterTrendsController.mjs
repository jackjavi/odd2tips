import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import TwitterTrends from "../../models/TwitterTrends.mjs";

const scrapeTrends24 = async (req, res) => {
  // Read and parse countries.json file
  const countriesData = JSON.parse(fs.readFileSync("./countries.json", "utf8"));

  let browser;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    let trends = [];
    let attempts = 0;
    const maxAttempts = 5;
    let selectedCountry;

    while (trends.length === 0 && attempts < maxAttempts) {
      // Select a random country URL
      const randomCountry =
        countriesData[Math.floor(Math.random() * countriesData.length)];
      selectedCountry = randomCountry.country;
      const url = randomCountry.url;

      console.log(
        `Attempting to scrape trends for ${selectedCountry} (Attempt ${
          attempts + 1
        }/${maxAttempts})`
      );

      await page.goto(url, {
        waitUntil: "networkidle2",
        timeout: 60000,
      });

      trends = await page.evaluate(() => {
        const trendCards = Array.from(document.querySelectorAll(".trend-card"));
        let trendCard = trendCards.find((card) => {
          const timeText = card
            .querySelector(".trend-card__time")
            ?.innerText.trim();
          return (
            timeText === "few minutes ago" ||
            timeText === "1 hour ago" ||
            "2 hours ago" ||
            "3 hours ago" ||
            "4 hours ago" ||
            "5 hours ago" ||
            /^(?:[1-5]?[0-9] minutes ago)$/.test(timeText)
          );
        });

        if (trendCard) {
          return Array.from(
            trendCard.querySelectorAll("ol.trend-card__list li a")
          ).map((anchor) => ({
            title: anchor.innerText.trim(),
            url: anchor.href,
          }));
        }
        return [];
      });

      attempts++;
    }

    if (trends.length > 0) {
      console.log(`Saving trends for ${selectedCountry}:`, trends);
      // Delete existing data for the country
      await TwitterTrends.deleteMany({ country: selectedCountry });

      // Save new trends data
      const newTrends = new TwitterTrends({
        country: selectedCountry,
        timestamp: new Date(),
        trends,
      });
      await newTrends.save();

      res.status(200).json({
        message: `Trends saved successfully for ${selectedCountry}`,
        newTrends: trends,
      });
    } else {
      console.log(`No valid trends found after ${maxAttempts} attempts`);
      res
        .status(500)
        .json({ message: "No valid trends found after multiple attempts" });
    }
  } catch (error) {
    console.error("Error scraping Trends24:", error);
    res.status(500).json({ message: "Error scraping Trends24" });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

export { scrapeTrends24 };
