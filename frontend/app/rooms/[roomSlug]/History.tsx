"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatDate } from "@/app/utils/dateUtils";

interface HistoryEntry {
  date: string | null;
  status: string;
  roomId: string;
  _id: string;
}

interface HistroyProps {
  roomId: string | null;
}

const History: React.FC<HistroyProps> = ({ roomId }) => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `/api/football/get-history?roomId=${roomId}`,
          { withCredentials: true }
        );

        const formattedHistory = response.data.map((entry) => ({
          date: entry.date,
          status: entry.status,
          roomId: entry.roomId.toString(),
        }));
        setHistory(formattedHistory);
      } catch (error) {
        console.error("Error fetching history:", error);
        setError("Failed to fetch history");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [roomId]);
  history.forEach((entry) => {
    console.log(entry.date, entry.status, entry.roomId);
  });

  const getLast7Days = () => {
    const today = new Date();
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      last7Days.push(formatDate(date));
    }
    return last7Days;
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-teal-700 mb-3">Last 7 Days</h3>
      {isLoading ? (
        <p>Loading history...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul className="list-disc pl-5">
          {getLast7Days().map((day) => {
            const historyEntry = history.find((entry) => entry.date === day);

            return (
              <li key={day}>
                {day}: {historyEntry?.status || "-"}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default History;
