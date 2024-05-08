"use client";

import React, { useState } from "react";
import Loading from "../Components/Loading";
import { analyzeFootballResults } from "../utils/football";

const AnalyzeResults: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const analyzeResults = async () => {
    setLoading(true);
    try {
      await analyzeFootballResults();
      setSuccess(true);
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <button onClick={analyzeResults}>
        Analyze Results {success && "- Results analyzed successfully"}
      </button>
    </div>
  );
};

export default AnalyzeResults;
