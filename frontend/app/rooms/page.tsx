import React from "react";
import Navbar from "../Components/Navbar";
import CreateRoomLink from "../Components/CreateRoomLink";
import GetRooms from "./GetRooms";
import Footer from "../Components/Footer";
import { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
import { fetchRooms } from "@/lib/api";
import { Room } from "@/interfaces/room";
export const dynamicParams = true;

export const metadata: Metadata = {
  title: "Expert Football Predictions & Betslips & Football News",
  description:
    "Get the best football predictions and analysis from our expert tipsters. Join the football enthusiasts and fans to get the best football betslips.",
  keywords: [
    "Manchester United, Chelsea, Arsenal, Liverpool, Manchester City, Barcelona, Real Madrid, Juventus, PSG, Bayern Munich, Borussia Dortmund, Atletico Madrid, Inter Milan, AC Milan, Napoli, Lazio, Roma, Sevilla, Valencia, Villarreal, Real Sociedad, Athletic Bilbao, Real Betis, Real Valladolid, Celta Vigo, Eibar, Getafe, Granada, Huesca, Levante, Osasuna, football predictions, football news, football betting, expert tips, football analysis, football betslips, free expert odds, sure tips, daily odds, today&apos;s tip, odds today, football predictions today, football news today, football betting today, expert tips today, football analysis today, football betslips today, free expert odds today, sure tips today, daily odds today, today&apos;s tip today, odds today today, football predictions today today, football news today today, football betting today today, expert tips today today, football analysis today today, football betslips today today, free expert odds today today, sure tips today today, daily odds today today, today&apos;s tip today today, odds today today today,football predictions, football news, football betting, expert tips, football analysis, football betslips, free expert odds, sure tips, daily odds, today&apos;s tip, odds today, football predictions today, football news today, football betting today, expert tips today, football analysis today, football betslips today, free expert odds today, sure tips today, daily odds today, today&apos;s tip today, odds today today, football predictions today today, football news today today, football betting today today, expert tips today today, football analysis today today, football betslips today today, free expert odds today today, sure tips today today, daily odds today today, today&apos;s tip today today, odds today today today",
  ],
};

const GetRoomPage: React.FC = async () => {
  const rooms: Room[] = await fetchRooms();
  return (
    <div className="bg-[whitesmoke]">
      <GoogleTagManager gtmId="G-T2RQ49FPP3" />
      <Navbar />
      <main className="relative min-h-screen md:min-h-screen bg-[whitesmoke] w-[90vw] md:w-[80vw] mx-auto">
        {/*<div className="absolute top-36 right-4 md:top-56 md:right-8">
          <CreateRoomLink />
  </div>*/}
        <div className="flex flex-col items-center justify-center py-10">
          <GetRooms rooms={rooms} />
        </div>
      </main>
      <Footer />
      <Script
        type="text/javascript"
        async
        src="//pl23425064.highrevenuenetwork.com/eb/5c/12/eb5c12854223758b1c37d433598047c3.js"
      />
      <Script
        type="text/javascript"
        async
        src="//pl23430474.highrevenuenetwork.com/d4/db/06/d4db06bc86d5410193a1ac45bef7482a.js"
      />
    </div>
  );
};

export default GetRoomPage;
