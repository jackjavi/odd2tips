// pages/index.js
import React from "react";
import Chat from "./Components/Chat";
import Navbar from "./Components/Navbar";
import SportsMonk from "./Components/SportsMonk";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-300 max-w-[50vw] mx-auto text-black flex flex-col items-center justify-center">
        <h1>Welcome to the Chat Room!</h1>
        <Chat />
        <SportsMonk />
      </div>
    </>
  );
};

export default Home;
