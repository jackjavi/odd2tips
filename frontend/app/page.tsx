import React from "react";
import Chat from "./Components/Chat";
import Navbar from "./Components/Navbar";
import SportsMonk from "./Components/SportsMonk";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Welcome to Odd2Tips!
          </h1>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <Chat />
            </div>
            <div className="md:w-1/2">
              <SportsMonk />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
