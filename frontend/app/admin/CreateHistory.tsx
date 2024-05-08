"use client";

import React, { useState } from "react";
import createHistory from "./CreateHistory";
import Loading from "../Components/Loading";

const CreateHistory: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<boolean>(false);

  const createHistory = async () => {
    setLoading(true);
    try {
      await createHistory();

      setSuccess(true);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
    }

    if (loading) {
      return <Loading />;
    }
  };
  return (
    <div>
      <button onClick={createHistory}>
        CreateHistory {success && "- successfully created"}
      </button>
    </div>
  );
};

export default CreateHistory;
