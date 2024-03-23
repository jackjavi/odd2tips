import React from "react";
import Chat from "./Components/Chat";
import Navbar from "./Components/Navbar";
// import SportsMonk from "./Components/SportsMonk";
import Footer from "./Components/Footer";
import Daily2Odds from "./Components/Daily2Odds";

const Home = () => {
  return (
    <>
      <Navbar />
      <div
        className="bg-gray-100 px-4 py-8 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-bg.webp')" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 bg-gradient-to-r from-green-500 to-blue-600 bg-opacity-50 bg-cover bg-center bg-no-repeat rounded-lg p-6 shadow-lg">
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 animate-pulse">
              Odd2Tips
            </h1>
            <p className="mt-4 text-xl text-[whitesmoke] animate-pulse">
              The ultimate sports prediction platform
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
            <div>
              <Daily2Odds />
            </div>
            {/*<div className="flex flex-col md:flex-row gap-8 mt-8">
              <div className="md:w-1/2">
                <SportsMonk />
              </div>
              <div className="md:w-1/2">
                <SportsMonk />
              </div>
  </div>*/}

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
