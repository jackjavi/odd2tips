"use client";

import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8888/api/auth/login",
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      window.alert(`Logged in successfully ${response.data.userData.email}`);
      // router.push("/"); // Redirect to the homepage or dashboard
      window.location.replace("/");
    } catch (err) {
      setError(err.response.data.error || "Error logging in");
      console.error(err);
      window.location.href = "/login";
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-semibold text-center mb-6 text-gray-700">
            Login
          </h1>
          {error && (
            <p className="bg-red-100 text-red-500 p-3 rounded">{error}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="mt-1 p-2 w-full border rounded-md text-gray-700"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="mt-1 p-2 w-full border rounded-md text-gray-700"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
