"use client";

import React, { useState, useEffect } from "react";
import { fetchScrapedPredictions } from "../utils/football";
import Loading from "../Components/Loading";
import { Prediction } from "../../interfaces/Prediction";

const ScrapePredictions = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPredictions = async () => {
    setLoading(true);
    try {
      const predictions = await fetchScrapedPredictions();
      console.log(predictions);
    } catch (error) {
      console.error("Error fetching predictions:", error);
    } finally {
      setLoading(false);
      alert("Predictions fetched successfully");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <button onClick={fetchPredictions}>scrap Predictions</button>
    </div>
  );
};

export default ScrapePredictions;
