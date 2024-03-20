"use client";

import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8888/api/auth/register",
        { email, password }
      );

      localStorage.setItem("token", JSON.stringify(response.data.token));
      alert(`Registration successful. Please log in.`);
      router.push("/login");
    } catch (err) {
      setError(err.response?.data.error || "Error registering");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-100">
        <div className="flex flex-col justify-center w-full md:w-1/2 p-12 bg-gradient-to-r from-green-500 to-blue-600 text-white">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-semibold text-center mb-8">
              Register
            </h1>
            {error && (
              <p className="bg-red-100 text-red-500 p-3 rounded">{error}</p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="mt-1 p-2 w-full rounded-md text-gray-700"
                />
              </div>
              <div>
                <input
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
                Register
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
