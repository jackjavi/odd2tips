"use client";

import React, { useEffect, useState } from "react";
import Container from "@/app/blog/_components/container";
import { HeroPost } from "@/app/blog/_components/hero-post";
import { Intro } from "@/app/blog/_components/intro";
import { MoreStories } from "@/app/blog/_components/more-stories";
import { getAllPosts } from "@/lib/api";
import { Post } from "@/interfaces/post";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Metadata } from "next";

{
  /*export const metadata: Metadata = {
  title: "Football latest trending news",
  description:
    "Get the latest trending news in the football world. Stay updated with the latest news, fixtures, and results. Top Leagues - English Premier League, La Liga, Serie A, Bundesliga, Ligue 1, and more.",
  keywords: [
    "football, news, trending, fixtures, results, premier league, la liga, serie a, bundesliga, ligue 1",
  ],
};*/
}

export default function Index() {
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getAllPosts();
      setAllPosts(posts);
    };

    fetchPosts();
  }, []);

  const heroPost = allPosts.length > 0 ? allPosts[0] : null;
  const morePosts = allPosts.length > 1 ? allPosts.slice(1) : [];

  return (
    <div className="bg-[whitesmoke]">
      <Navbar />
      <main>
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImagePath={heroPost.coverImagePath}
              date={new Date(heroPost.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              excerpt={heroPost.excerpt}
              content={heroPost.markdown}
              markdown={heroPost.markdown}
              authorName={heroPost.authorName}
              authorImagePath={heroPost.authorImagePath}
              slug={heroPost.slug}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </main>
      <Footer />
    </div>
  );
}
