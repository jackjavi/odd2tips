import twitterTrendsRoutes from "./scraping/twitterTrendsRoutes.mjs";
import betHistoryRoutes from "../routes/history/historyRoutes.mjs";
import xroutes from "./twitter/xroutes.mjs";

const routes = (app) => {
  app.use("/api/scrapedData", twitterTrendsRoutes);
  app.use("/api/history", betHistoryRoutes);
  app.use("/api/twitter", xroutes);
};

export default routes;
