import puppeteer from "puppeteer";
import KenyaTrends from "../../models/KenyaTrends.mjs";

const scrapeTrends24 = async (req, res) => {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto("https://trends24.in/kenya/", {
      waitUntil: "networkidle2",
    });

    const trends = await page.evaluate(() => {
      const trendCard = Array.from(
        document.querySelectorAll(".trend-card")
      ).find(
        (card) =>
          card.querySelector(".trend-card__time")?.innerText.trim() ===
          "1 hour ago"
      );

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
      // Delete existing data
      await KenyaTrends.deleteMany({});

      // Save new trends data
      const newTrends = new KenyaTrends({
        timestamp: new Date(),
        trends,
      });
      await newTrends.save();

      res.status(200).json({ message: "Trends saved successfully", trends });
    } else {
      res.status(200).json({ message: "No trends found for 1 hour ago" });
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
