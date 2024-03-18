// pages/index.js
import React from "react";
import Chat from "./Components/Chat";
import Navbar from "./Components/Navbar";
import SportsMonk from "./Components/SportsMonk";

const Home = () => {
  return (
    <>
      <Navbar />
      <div>
        <h1>Welcome to the Chat Room!</h1>
        <Chat />
        <SportsMonk />
      </div>
    </>
  );
};

export default Home;
