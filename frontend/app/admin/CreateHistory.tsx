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
      const history = await createHistory();
      console.log(history);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
      setSuccess(true);
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
