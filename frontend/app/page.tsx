import React from "react";
import Chat from "./Components/Chat";
import Navbar from "./Components/Navbar";
import SportsMonk from "./Components/SportsMonk";
import Footer from "./Components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      {/* Main section with background image */}
      <div
        className="bg-gray-100 px-4 py-8 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/garnacho-home_hero.jpeg')" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 bg-white bg-opacity-75 rounded-lg p-6 shadow-lg">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 animate-pulse">
              Welcome to Odd2Tips!
            </h1>
            <p className="mt-4 text-xl text-gray-700">
              The ultimate sports prediction platform.
            </p>
            <div className="mt-4">
              <a
                href="#features"
                className="inline-block bg-green-600 text-white rounded-full px-6 py-3 font-semibold shadow-lg hover:bg-green-700 transition-colors"
              >
                Explore Features
              </a>
            </div>
          </div>

          <div>
            <div className="flex flex-col md:flex-row gap-8 mt-8">
              <div className="md:w-1/2">
                <SportsMonk />
              </div>
              <div className="md:w-1/2">
                <SportsMonk />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 mt-8 items-center justify-center">
              <div className="md:w-1/2">
                <Chat />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
