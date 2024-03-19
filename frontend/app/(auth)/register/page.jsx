"use client";

import { useState } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer"; // Adjust the path based on your project structure
import { useRouter } from "next/router";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8888/api/auth/register",
        { email, password }
      );
      console.log(response.data);
      // router.push("/login"); // or router.push('/') for home page
      window.location.href = "/login";
    } catch (err) {
      setError(err.response.data.error || "Error registering");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 text-gray-700">
        <div className="p-8 bg-white shadow-md rounded-lg max-w-md w-full">
          <h1 className="text-2xl font-semibold text-center mb-4">Register</h1>
          {error && (
            <p className="bg-red-100 text-red-600 p-3 rounded">{error}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                className="w-full p-2 border border-gray-300 rounded-md"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div>
              <input
                className="w-full p-2 border border-gray-300 rounded-md"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <button
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors duration-200"
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
