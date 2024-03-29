"use client";

import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const BASE_URL = `https://odd2tips.onrender.com/api/`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}auth/login`, {
        email,
        password,
      });
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.userData));
      router.push("/");
    } catch (err) {
      setError(err.response?.data.error || "Error logging in");
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-100">
        <div className="flex flex-col justify-center w-full md:w-1/2 p-12 bg-gradient-to-r from-green-500 to-blue-600 text-white">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-semibold text-center mb-8">Login</h1>
            {error && (
              <p className="bg-red-100 text-red-500 p-3 rounded">{error}</p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="mt-1 p-2 w-full rounded-md text-gray-700"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="mt-1 p-2 w-full rounded-md text-gray-700"
                />
              </div>
              <button
                type="submit"
                className="w-full p-2 rounded hover:bg-blue-700 transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        </div>

        <div
          className="w-1/2 bg-cover bg-no-repeat bg-center hidden md:block"
          style={{ backgroundImage: "url('/football_bg.jpg')" }}
        ></div>
      </div>
      <Footer />
    </>
  );
}
