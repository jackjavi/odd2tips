import React from "react";
import Navbar from "../Components/Navbar";
import CreateRoomLink from "../Components/CreateRoomLink";
import GetRooms from "../Components/getRooms";
import Footer from "../Components/Footer";
import { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Expert Football Predictions & Betslips & Football News",
  description:
    "Get the best football predictions and analysis from our expert tipsters. Join the football enthusiasts and fans to get the best football betslips.",
  keywords: [
    "Manchester United, Chelsea, Arsenal, Liverpool, Manchester City, Barcelona, Real Madrid, Juventus, PSG, Bayern Munich, Borussia Dortmund, Atletico Madrid, Inter Milan, AC Milan, Napoli, Lazio, Roma, Sevilla, Valencia, Villarreal, Real Sociedad, Athletic Bilbao, Real Betis, Real Valladolid, Celta Vigo, Eibar, Getafe, Granada, Huesca, Levante, Osasuna, football predictions, football news, football betting, expert tips, football analysis, football betslips, free expert odds, sure tips, daily odds, today&apos;s tip, odds today, football predictions today, football news today, football betting today, expert tips today, football analysis today, football betslips today, free expert odds today, sure tips today, daily odds today, today&apos;s tip today, odds today today, football predictions today today, football news today today, football betting today today, expert tips today today, football analysis today today, football betslips today today, free expert odds today today, sure tips today today, daily odds today today, today&apos;s tip today today, odds today today today,football predictions, football news, football betting, expert tips, football analysis, football betslips, free expert odds, sure tips, daily odds, today&apos;s tip, odds today, football predictions today, football news today, football betting today, expert tips today, football analysis today, football betslips today, free expert odds today, sure tips today, daily odds today, today&apos;s tip today, odds today today, football predictions today today, football news today today, football betting today today, expert tips today today, football analysis today today, football betslips today today, free expert odds today today, sure tips today today, daily odds today today, today&apos;s tip today today, odds today today today",
  ],
};

const GetRoomPage: React.FC = () => {
  return (
    <>
      <GoogleTagManager gtmId="G-T2RQ49FPP3" />
      <main className="relative min-h-screen md:min-h-screen bg-[whitesmoke]">
        <Navbar />
        {/*<div className="absolute top-36 right-4 md:top-56 md:right-8">
          <CreateRoomLink />
  </div>*/}
        <div className="flex flex-col items-center justify-center py-10">
          <GetRooms />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default GetRoomPage;
