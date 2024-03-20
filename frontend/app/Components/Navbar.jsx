"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { logout } from "../utils/auth";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    setIsModalOpen(false);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-4 shadow-lg relative flex justify-center h-[15vh]">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl md:text-2xl font-bold">Odd2Tips</div>
        <button onClick={toggleModal} className="md:hidden z-20">
          Menu
        </button>
        <div
          className={`absolute md:static top-full right-0 mt-[calc(10vh+1rem)] md:mt-0 w-full md:w-auto bg-white md:bg-transparent text-black md:text-white p-4 md:p-0 rounded-md shadow-lg md:shadow-none transform transition-all ease-in-out duration-300 ${
            isModalOpen ? "translate-x-0" : "translate-x-full"
          } md:translate-x-0 md:flex md:items-center md:justify-center md:space-x-4`}
        >
          <Link
            href="/"
            className="block px-4 py-2 rounded-md hover:bg-green-700 transition-all ease-in-out duration-200 md:text-white md:hover:bg-transparent"
            onClick={() => setIsModalOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/predictions"
            className="block px-4 py-2 rounded-md hover:bg-blue-700 transition-all ease-in-out duration-200 md:text-white md:hover:bg-transparent"
            onClick={() => setIsModalOpen(false)}
          >
            Predictions
          </Link>
          <Link
            href="/news"
            className="block px-4 py-2 rounded-md hover:bg-green-700 transition-all ease-in-out duration-200 md:text-white md:hover:bg-transparent"
            onClick={() => setIsModalOpen(false)}
          >
            News
          </Link>
          <Link
            href="/chat"
            className="block px-4 py-2 rounded-md hover:bg-blue-700 transition-all ease-in-out duration-200 md:text-white md:hover:bg-transparent"
            onClick={() => setIsModalOpen(false)}
          >
            Chat
          </Link>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="block px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-200 md:text-white md:bg-transparent md:hover:bg-transparent"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="block px-4 py-2 rounded-md bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-200 md:text-white md:bg-transparent md:hover:bg-transparent"
              onClick={() => setIsModalOpen(false)}
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
