import React from "react";
import ScrapedFixtures from "./ScrapedFixturesComponent";
import ScrapedResults from "./ScrapedResultsComponent";
import ScrapePredictions from "./ScrapedPredictionsComponent";
import { Prediction } from "../../interfaces/Prediction";

const AdminPage: React.FC = () => {
  return (
    <div>
      <h1>Admin Page</h1>
      <ScrapedFixtures />
      <ScrapedResults />
      <ScrapePredictions />
    </div>
  );
};

export default AdminPage;
