"use client";

import Navbar from "../../Components/Navbar";
import GoogleSignInButton from "../../Components/GoogleSignInButton";
import Footer from "../../Components/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ott = params.get("ott");
    if (ott) {
      exchangeOTTForSession(ott);
    }
  }, []);

  const exchangeOTTForSession = async (ott) => {
    try {
      const response = await axios.post(
        "/api/auth/google/exchange-ott",
        { ott },
        { withCredentials: true }
      );

      window.location.href = "/";
    } catch (error) {
      console.error("Error exchanging OTT:", error);
      setError("Error exchanging OTT");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/auth/login`, {
        email,
        password,
      });
      router.push("/");
    } catch (err) {
      setError(err.response?.data.error || "Error logging in");
      console.error(err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      window.location.href = "https://odd2tips.onrender.com/auth/google";
    } catch (err) {
      setError(err.response?.data.error || "Error with Google login");
      console.error("Error with Google login:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex h-full">
        <div className="flex flex-col justify-center w-full md:w-1/2 p-12 text-white gap-4 bg-gradient-to-r from-slate-500 to-slate-900">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-semibold text-center mb-8 text-blue-200 font-playfair">
              Login
            </h1>
            {error && (
              <p className="bg-red-100 text-red-500 p-3 rounded">{error}</p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold">
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
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold"
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
                  className="mt-1 mb-4 p-2 w-full rounded-md text-gray-700"
                />
              </div>
              <button
                type="submit"
                className="w-full p-2 rounded bg-green-600 hover:bg-purple-500 transition-colors font-bold "
              >
                Login
              </button>
            </form>
          </div>
          <div className="flex items-center justify-center  py-2">
            <div className="border-t border-slate-500 w-[10%]" />
            <span className="px-4 text-sm font-montserrat text-[whitesmoke] ">
              or
            </span>
            <div className="border-t border-slate-500 w-[10%]" />
          </div>

          <div className="flex justify-center items-center">
            <GoogleSignInButton onClick={handleGoogleLogin} />
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
