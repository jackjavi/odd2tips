"use client";

import React, { useState, useEffect } from "react";
import { fetchScrapedResults } from "../utils/football";
import Loading from "../Components/Loading";
import { Result } from "../../interfaces/Result";

const scrapedResults = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const fixtures = await fetchScrapedResults();
      console.log(fixtures);
    } catch (error) {
      console.error("Error fetching rsults:", error);
    } finally {
      setLoading(false);
      alert("Results fetched successfully");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <button onClick={fetchResults}>scrap FIxtures</button>
    </div>
  );
};

export default scrapedResults;
