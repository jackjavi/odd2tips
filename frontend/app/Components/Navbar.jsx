"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { logout } from "../utils/auth";
import { IoIosMenu } from "react-icons/io";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ro } from "date-fns/locale";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(`/api/auth/checkAuth`, {
          withCredentials: true,
        });
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        // console.error("Error checking authentication status:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, [router.pathname]);
  setTimeout(() => {
    console.log(isAuthenticated);
  }, 3000);
  const handleLogout = async () => {
    await logout();
    setIsAuthenticated(false);
    setIsModalOpen(false);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const navLinks = (
    <>
      <Link
        href="/"
        className="block px-4 py-2 text-green-600 md:text-[whitesmoke] hover:text-gray-200 transition-all ease-in-out duration-200 font-medium md:text-lg" // Style changes here
        onClick={() => setIsModalOpen(false)}
      >
        Home
      </Link>
      <Link
        href="/rooms"
        scroll={false}
        className="block px-4 py-2 text-green-600 md:text-[whitesmoke] hover:text-gray-200 transition-all ease-in-out duration-200 font-medium md:text-lg" // Style changes here
        onClick={() => setIsModalOpen(false)}
      >
        Tipster Rooms
      </Link>

      <Link
        href="/blog"
        scroll={false}
        className="block px-4 py-2 text-green-600 md:text-[whitesmoke] hover:text-gray-200 transition-all ease-in-out duration-200 font-medium md:text-lg"
        onClick={() => setIsModalOpen(false)}
      >
        News
      </Link>
      <Link
        href="/#chat"
        scroll={false}
        className="block px-4 py-2 text-green-600 md:text-[whitesmoke] hover:text-gray-200 transition-all ease-in-out duration-200 font-medium md:text-lg"
        onClick={() => setIsModalOpen(false)}
      >
        Chat
      </Link>
      {isAuthenticated ? (
        <button
          onClick={handleLogout}
          className="block px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-all ease-in-out duration-200 font-medium md:text-lg" // Style changes here
        >
          Logout
        </button>
      ) : (
        <>
          <Link
            href="/login"
            scroll={false}
            className="block px-4 py-2 rounded-md hover:bg-blue-500 text-white bg-green-600 transition-all ease-in-out duration-200 font-medium md:text-lg" // Style changes here
            onClick={() => setIsModalOpen(false)}
          >
            Login
          </Link>
          <Link
            href="/register"
            scroll={false}
            className="block px-4 py-2 mt-2 md:mt-0 rounded-md bg-green-600 text-white hover:bg-blue-500 transition-all ease-in-out duration-200 font-medium md:text-lg" // Style changes here
            onClick={() => setIsModalOpen(false)}
          >
            Register
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-4 relative flex justify-center h-[20vh]">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/">
            <Image
              src="/logo.png"
              className="cursor-pointer"
              alt="Logo-SVG"
              width={70}
              height={70}
            />
          </Link>
        </div>
        <button
          onClick={toggleModal}
          className="md:hidden z-30 text-white focus:outline-none"
        >
          <IoIosMenu size={40} />
        </button>
        {/* Modal for small screens */}
        {isModalOpen && (
          <div
            className={`fixed top-0 right-0 md:hidden w-3/4 bg-white text-black p-4 rounded-md shadow-lg z-20 transition-transform duration-300 ease-in-out ${
              isModalOpen
                ? "translate-x-0 bg-cover bg-no-repeat bg-center"
                : "translate-x-full"
            }`}
            style={{
              marginTop: `calc(10vh + 1rem)`,
              backgroundImage: "url('/logo.png')",
            }}
          >
            {navLinks}
          </div>
        )}
        {/* Static display for larger screens */}
        <div className="hidden md:flex md:items-center md:justify-center md:space-x-4">
          {navLinks}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
