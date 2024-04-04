"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { GameData } from "@/interfaces/gameData";
import { useRouter } from "next/navigation";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const AdminPage: React.FC = () => {
  const [gameData, setGameData] = useState<GameData[]>([]);
  const router = useRouter();
  const [formData, setFormData] = useState<GameData>({
    gameTitle: "",
    predictionType: "",
    startTime: "",
    homeTeam: "",
    awayTeam: "",
    prediction: "",
    odd: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    const updatedValue = type === "number" ? parseFloat(value) : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const BASE_URL = "https://odd2tips.onrender.com/api/";

    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found, redirecting to login...");

      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}games/gameData`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      alert(`Form submission successful: ${response.data.gameTitle}`);
      router.push("/admin");
    } catch (error) {
      console.error("Failed to submit form:", error);
    }
  };

  return (
    <>
      <Navbar />{" "}
      <main className="max-w-4xl mx-auto my-10">
        <h2 className="text-3xl font-semibold text-center mb-5">Admin Page</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gameTitle"
            >
              Game Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="gameTitle"
              type="text"
              placeholder="Enter game title   e.g. UEFA Champions League"
              name="gameTitle"
              value={formData.gameTitle}
              onChange={handleChange}
            />
          </div>
          {/* Prediction Type Input */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="predictionType"
            >
              Prediction Type
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="predictionType"
              type="text"
              placeholder="Enter prediction type   e.g. ODD2TIPS, JACKPOT"
              name="predictionType"
              value={formData.predictionType}
              onChange={handleChange}
            />
          </div>

          {/* Start Time Input */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="startTime"
            >
              Start Time
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="startTime"
              type="datetime-local"
              placeholder="Select start time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
            />
          </div>

          {/* Home Team Input */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="homeTeam"
            >
              Home Team
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="homeTeam"
              type="text"
              placeholder="Enter home team"
              name="homeTeam"
              value={formData.homeTeam}
              onChange={handleChange}
            />
          </div>

          {/* Away Team Input */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="awayTeam"
            >
              Away Team
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="awayTeam"
              type="text"
              placeholder="Enter away team"
              name="awayTeam"
              value={formData.awayTeam}
              onChange={handleChange}
            />
          </div>

          {/* Prediction Input */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="prediction"
            >
              Prediction
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="prediction"
              type="text"
              placeholder="Enter prediction"
              name="prediction"
              value={formData.prediction}
              onChange={handleChange}
            />
          </div>

          {/* Odd Input */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="odd"
            >
              Odd
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="odd"
              type="number"
              placeholder="Enter odd"
              name="odd"
              min="0.01"
              step="0.01"
              value={formData.odd}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit Game Data
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default AdminPage;
