import twitterTrendsRoutes from "./scraping/twitterTrendsRoutes.mjs";

const routes = (app) => {
  app.use("/api/scrapedData", twitterTrendsRoutes);
};

export default routes;
