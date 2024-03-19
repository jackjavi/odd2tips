"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { logout } from "../utils/auth";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false); // Optionally update state to reflect logout without a page reload
  };

  return (
    <nav className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-4 shadow-lg h-[10vh]">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl md:text-2xl font-bold text-shadow">
          Odd2Tips
        </div>
        <div className="flex space-x-4 items-center">
          <Link
            className="px-4 py-2 rounded-md hover:bg-green-700 transition-all ease-in-out duration-200"
            href="/"
          >
            Home
          </Link>
          <Link
            className="px-4 py-2 rounded-md hover:bg-blue-700 transition-all ease-in-out duration-200"
            href="/predictions"
          >
            Predictions
          </Link>
          <Link
            className="px-4 py-2 rounded-md hover:bg-green-700 transition-all ease-in-out duration-200"
            href="/news"
          >
            News
          </Link>
          <Link
            className="px-4 py-2 rounded-md hover:bg-blue-700 transition-all ease-in-out duration-200"
            href="/chat"
          >
            Chat
          </Link>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-200"
            >
              Logout
            </button>
          ) : (
            <Link
              className="px-4 py-2 rounded-md bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-200"
              href="/login"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
