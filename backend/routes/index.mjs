import twitterTrendsRoutes from "./scraping/twitterTrendsRoutes.mjs";
import betHistoryRoutes from "../routes/history/historyRoutes.mjs";

const routes = (app) => {
  app.use("/api/scrapedData", twitterTrendsRoutes);
  app.use("/api/history", betHistoryRoutes);
};

export default routes;
