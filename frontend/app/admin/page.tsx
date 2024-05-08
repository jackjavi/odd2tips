import React from "react";
import ScrapedFixtures from "./ScrapedFixturesComponent";
import ScrapedResults from "./ScrapedResultsComponent";
import ScrapePredictions from "./ScrapedPredictionsComponent";
import CreateHistory from "./CreateHistory";
import StorePredictzResults from "./StorePredictzResults";
import AnalyzeResults from "./AnalyzeResults";
import AllocateFixtures from "./AllocateFixtures";

const AdminPage: React.FC = () => {
  return (
    <div>
      <h1>Admin Page</h1>
      <ScrapedFixtures />
      <ScrapedResults />
      <ScrapePredictions />
      <AllocateFixtures />
      <CreateHistory />
      <StorePredictzResults />
      <AnalyzeResults />
    </div>
  );
};

export default AdminPage;
