import React, { useEffect, useState } from "react";
import { FaArrowRotateRight } from "react-icons/fa6";
import Chat from "./Components/Chat";
import Navbar from "./Components/Navbar";
// import SportsMonk from "./Components/SportsMonk";
import Footer from "./Components/Footer";
import Daily2Odds from "./Components/Daily2Odds";
import { HeroPost } from "./blog/_components/hero-post";
import { getAllPosts } from "@/lib/api";
import Link from "next/link";
import { Post } from "@/interfaces/post";
import Container from "@/app/blog/_components/container";
import Investments from "@/app/Components/investmentsPlay";
import AboutSection from "@/app/Components/AboutSection";
import BetSlipPromotion from "@/app/Components/BetSlipPromotion";
import RoomsPromotion from "./Components/RoomsPromotion";
import RandomGameData from "@/app/Components/RandomGameData";
import { GoogleTagManager } from "@next/third-parties/google";
import RandomRooms from "@/app/Components/RandomRooms";
import { YouTubeEmbed } from "@next/third-parties/google";
import Script from "next/script";
export const dynamicParams = true;

const Home = async () => {
  const allPosts = await getAllPosts();

  const heroPost = allPosts.length > 0 ? allPosts[0] : null;
  return (
    <>
      <GoogleTagManager gtmId="G-2242Y4EH8R" />
      <div className="bg-[whitesmoke] ">
        <Navbar />
        <div className="flex flex-col md:flex-row md:container mx-auto">
          <div className="w-full md:w-1/2">
            <RandomRooms />
          </div>
          <div className="w-full md:w-1/2">
            <RoomsPromotion />
          </div>
        </div>

        <RandomGameData />

        {/*<AboutSection />*/}

        <BetSlipPromotion />

        {heroPost && (
          <Container>
            <div className="py-8 ">
              <HeroPost post={heroPost} />
              <div className="">
                <Link
                  className="text-teal-500 flex flex-col items-center gap-4 md:py-24"
                  href="/blog"
                >
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-bold tracking-tighter leading-tight ">
                    More Stories
                  </h2>
                  <FaArrowRotateRight size={15} />
                </Link>
              </div>
            </div>
          </Container>
        )}
        <Footer />
      </div>
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
    </>
  );
};

export default Home;
