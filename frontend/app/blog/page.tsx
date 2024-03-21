"use client";

import React, { useEffect, useState } from "react";
import Container from "@/app/blog/_components/container";
import { HeroPost } from "@/app/blog/_components/hero-post";
import { Intro } from "@/app/blog/_components/intro";
import { MoreStories } from "@/app/blog/_components/more-stories";
import { getAllPosts } from "@/lib/api";
import { Post } from "@/interfaces/post";

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
    <main>
      <Container>
        <Intro />
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImagePath={heroPost.coverImagePath} // Adjusted to use the new property name
            date={new Date(heroPost.date).toLocaleDateString("en-US", {
              // Formatted date string
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            excerpt={heroPost.content.substring(0, 200)} // Using a part of content as an excerpt
            authorName={heroPost.authorName} // Now directly using the authorName
            authorImagePath={heroPost.authorImagePath} // Using the new path for the author's image
            slug={heroPost._id} // Assuming _id is used as a unique identifier for routing
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </main>
  );
}
