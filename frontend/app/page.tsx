"use client";

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

const Home = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getAllPosts();
      setAllPosts(posts);
    };

    fetchPosts();
  }, []);

  const heroPost = allPosts.length > 0 ? allPosts[0] : null;
  return (
    <>
      <Navbar />
      <div
        className="bg-gray-100 px-4 py-8 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-bg.webp')" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 bg-gradient-to-r from-green-500 to-blue-600 bg-opacity-20 bg-cover bg-center bg-no-repeat rounded-lg p-6 shadow-lg">
            <h1 className="text-5xl md:text-8xl font-bold tracking-wide leading-10 md:pr-8 animate-pulse text-[whitesmoke]">
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
      <Investments />
      {heroPost && (
        <Container>
          <div className="py-8 ">
            <HeroPost
              title={heroPost.title}
              coverImagePath={heroPost.coverImagePath}
              date={new Date(heroPost.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              excerpt={heroPost.content.substring(0, 200)}
              content={heroPost.content}
              authorName={heroPost.authorName}
              authorImagePath={heroPost.authorImagePath}
              slug={heroPost.slug}
            />
            <div className="flex flex-col items-center gap-4 md:py-24">
              <h2 className="text-3xl md:text-7xl font-bold tracking-tighter leading-tight text-[whitesmoke]">
                More Stories
              </h2>
              <Link href="/blog">
                <FaArrowRotateRight color="blue" size={28} />
              </Link>
            </div>
          </div>
        </Container>
      )}
      <Footer />
    </>
  );
};

export default Home;
