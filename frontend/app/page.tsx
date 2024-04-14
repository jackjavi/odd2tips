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
import AboutSection from "@/app/Components/AboutSection";

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
      <div className="bg-black px-4 py-8 bg-cover bg-center bg-no-repeat">
        <div className="container mx-auto">
          <div className="text-center mb-8 bg-gradient-to-r from-green-500 to-blue-600 bg-opacity-20 bg-cover bg-center bg-no-repeat rounded-lg p-6 shadow-lg">
            <h1 className="text-5xl md:text-8xl font-bold tracking-wide leading-10 md:pr-8 animate-pulse text-[whitesmoke]">
              Odd2Tips
            </h1>
            <p className="mt-4 text-xl text-[whitesmoke] animate-pulse">
              The ultimate sports prediction platform
            </p>
            <div className="mt-4">
              <Link
                href="/rooms"
                className="inline-block bg-green-600 text-white rounded-full px-6 py-3 font-semibold shadow-lg hover:bg-green-700 transition-colors"
              >
                Explore Tipsters
              </Link>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 mt-8 items-center justify-center"></div>
          <div className="px-4 py-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-[whitesmoke] mb-4">
                Who We Are
              </h2>
              <p className="text-lg md:text-xl text-[whitesmoke] mb-4">
                We are a platform that enables tipsters to have a global reach
                of clients and also allows clients to get the best odds from top
                tipsters with a winning record.
              </p>
              <p className="text-lg md:text-xl text-[whitesmoke] mb-8">
                Subscribe to our newsletter to receive instructions on how to
                leverage our platform to acquire new clients, have a portfolio
                as a professional tipster, and gain global reach.
              </p>
              <a
                href="#subscribe"
                className="inline-block bg-white text-blue-700 font-semibold rounded-lg text-lg px-8 py-3 hover:bg-gray-100 transition-colors"
              >
                Subscribe to Newsletter
              </a>
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
              <h2 className="text-2xl md:text-4xl font-bold tracking-tighter leading-tight text-[whitesmoke]">
                More Stories
              </h2>
              <Link href="/blog">
                <FaArrowRotateRight color="blue" size={20} />
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
