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
      console.log(posts);
    };

    fetchPosts();
  }, []);

  const heroPost = allPosts.length > 0 ? allPosts[0] : null;
  const morePosts = allPosts.length > 1 ? allPosts.slice(1) : [];

  return (
    <main>
      <h1>Hello</h1>
      {/*<Container>
        <Intro />
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImagePath}
            date={heroPost.date}
            excerpt={heroPost.content.substring(0, 200)} // Using content for excerpt
            author={{
              name: heroPost.authorName,
              picture: heroPost.authorImagePath,
            }}
            slug={heroPost.slug} // Ensure this is correctly handled based on your data
            ogImage={{ url: heroPost.coverImagePath }} // Example, adjust as needed
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </Container>*/}
    </main>
  );
}
