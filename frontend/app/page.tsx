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
    <div className="bg-gradient-to-r from-slate-900 to-slate-500 hover:from-green-400 hover:to-blue-500">
      <Navbar />

      <AboutSection />

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
    </div>
  );
};

export default Home;
