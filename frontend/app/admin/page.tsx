import React from "react";
import ScrapedFixtures from "./ScrapedFixturesComponent";
import ScrapedResults from "./ScrapedResultsComponent";
import ScrapePredictions from "./ScrapedPredictionsComponent";
import CreateHistory from "./CreateHistory";
import StorePredictzResults from "./StorePredictzResults";
import AnalyzeResults from "./AnalyzeResults";
import AllocateFixtures from "./AllocateFixtures";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const AdminPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <h1>Admin Page</h1>
        <ScrapedFixtures />
        <ScrapedResults />
        <ScrapePredictions />
        <AllocateFixtures />
        <CreateHistory />
        <StorePredictzResults />
        <AnalyzeResults />
      </main>
      <Footer />
    </>
  );
};

export default AdminPage;
