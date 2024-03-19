"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const SportsMonk = () => {
  const [fixtures, setFixtures] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8888/api/fixtures");
        setFixtures(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-8 h-[70vh] text-gray-900">
      <h2 className="text-2xl font-bold mb-4">Football Fixtures</h2>
      <ul className="text-gray-900">
        {fixtures.map((fixture) => (
          <li key={fixture.id} className="mb-2 text-gray-900">
            <span className="font-semibold">{fixture.name}</span> -{" "}
            <span>{new Date(fixture.starting_at).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SportsMonk;
