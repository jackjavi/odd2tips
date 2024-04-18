"use client";

import Navbar from "../../Components/Navbar";
import GoogleSignInButton from "../../Components/GoogleSignInButton";
import Footer from "../../Components/Footer";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("name", name);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    try {
      const res = await axios.post(`/api/auth/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(`Registration successful. Please log in.`);
      console.log(res.data);
      router.push("/login");
    } catch (err) {
      setError(err.response?.data.error || "Error registering");
    }
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
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
      <div className="flex min-h-screen ">
        <div className="flex flex-col justify-center gap-4 w-full md:w-1/2 p-12 bg-gradient-to-r from-slate-500 to-slate-900 text-white">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-semibold text-center text-blue-200 mb-8 font-playfair">
              Register
            </h1>
            {error && (
              <p className="bg-red-100 text-red-500 p-3 rounded">{error}</p>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm  text-gray-300 font-semibold"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  required
                  className="p-2 w-full rounded-md text-gray-700 "
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm  text-gray-300 font-semibold"
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
                  className="p-2 w-full rounded-md text-gray-700 "
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm  text-gray-300 font-semibold"
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
                  className="p-2 w-full rounded-md text-gray-700 "
                />
              </div>
              <div>
                <label
                  htmlFor="profilePicture"
                  className="block mb-2 text-sm font-medium text-gray-300"
                >
                  Profile Picture (Optional)
                </label>
                <input
                  id="profilePicture"
                  type="file"
                  onChange={handleFileChange}
                  name="profilePicture"
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 rounded bg-green-600 hover:bg-purple-500 transition-colors text-white font-semibold"
              >
                Register
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
