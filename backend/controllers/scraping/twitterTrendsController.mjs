import puppeteer from "puppeteer";
import TwitterTrends from "../../models/TwitterTrends.mjs";

const scrapeTrends24 = async (req, res) => {
  const urls = [
    { country: "Kenya", url: "https://trends24.in/kenya/" },
    { country: "Nigeria", url: "https://trends24.in/nigeria/" },
    { country: "Indonesia", url: "https://trends24.in/indonesia/" },
    { country: "India", url: "https://trends24.in/india/" },
    { country: "United States", url: "https://trends24.in/united-states/" },
    { country: "South Africa", url: "https://trends24.in/south-africa/" },
    { country: "Brazil", url: "https://trends24.in/brazil/" },
  ];

  let browser;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const newTrendsList = [];

    for (const { country, url } of urls) {
      await page.goto(url, {
        waitUntil: "networkidle2",
        timeout: 120000,
      });

      const trends = await page.evaluate(() => {
        const trendCards = Array.from(document.querySelectorAll(".trend-card"));
        let trendCard = trendCards.find((card) => {
          const timeText = card
            .querySelector(".trend-card__time")
            ?.innerText.trim();
          return (
            timeText === "1 hour ago" ||
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

      if (trends.length > 0) {
        console.log(`Saving trends for ${country}:`, trends);
        // Delete existing data for the country
        await TwitterTrends.deleteMany({ country });

        // Save new trends data
        const newTrends = new TwitterTrends({
          country,
          timestamp: new Date(),
          trends,
        });
        await newTrends.save();
        newTrendsList.push(newTrends);
      } else {
        console.log(
          `No trends found for ${country} for 1 hour ago or within the last hour`
        );
      }
    }

    res.status(200).json({
      message: "Trends saved successfully for all countries",
      newTrends: newTrendsList,
    });
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
