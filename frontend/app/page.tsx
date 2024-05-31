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
import RandomGameData from "@/app/Components/RandomGameData";
import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";

const Home = async () => {
  const allPosts = await getAllPosts();

  const heroPost = allPosts.length > 0 ? allPosts[0] : null;
  return (
    <>
      <GoogleTagManager gtmId="G-T2RQ49FPP3" />
      <div className="bg-[whitesmoke] ">
        <Navbar />

        <AboutSection />
        <Script id="at-options" type="text/javascript">
          {`
                atOptions = {
                  'key': 'a380aa0446bb0566a47b4ac5c08afff0',
                  'format': 'iframe',
                  'height': 300,
                  'width': 160,
                  'params': {}
                };
              `}
        </Script>
        <Script
          id="invoke-script"
          type="text/javascript"
          src="//www.topcreativeformat.com/a380aa0446bb0566a47b4ac5c08afff0/invoke.js"
        />
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
            <RandomGameData />
          </Container>
        )}
        <Footer />
      </div>
    </>
  );
};

export default Home;
