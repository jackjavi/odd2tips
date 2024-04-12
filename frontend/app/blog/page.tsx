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
    <>
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
              excerpt={heroPost.content.substring(0, 200)}
              content={heroPost.content}
              authorName={heroPost.authorName}
              authorImagePath={heroPost.authorImagePath}
              slug={heroPost.slug}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </main>
      <Footer />
    </>
  );
}
