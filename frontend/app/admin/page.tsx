import React from "react";
import ScrapedFixtures from "./ScrapedFixturesComponent";
import ScrapedResults from "./ScrapedResultsComponent";
import ScrapePredictions from "./ScrapedPredictionsComponent";
import CreateHistory from "./CreateHistory";

const AdminPage: React.FC = () => {
  return (
    <div>
      <h1>Admin Page</h1>
      <ScrapedFixtures />
      <ScrapedResults />
      <ScrapePredictions />
      <CreateHistory />
    </div>
  );
};

export default AdminPage;
