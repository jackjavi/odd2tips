"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Alert from "@/app/blog/_components/alert";
import Container from "@/app/blog/_components/container";
import Header from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";
import { PostBody } from "@/app/blog/_components/post-body";
import { PostHeader } from "@/app/blog/_components/post-header";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { Post as PostType } from "@/interfaces/post";
import Loading from "@/app/Components/Loading";
import { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";

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

const PostPage = () => {
  const [post, setPost] = useState<PostType | null>(null);
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (typeof slug === "string") {
        const fetchedPost = await getPostBySlug(slug);
        setPost(fetchedPost);
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return <Loading />;
  }

  if (!post) {
    return <div>&quot;Post not found&quot;</div>;
  }

  const content = post.content;

  return (
    <div className="bg-[whitesmoke]">
      <GoogleTagManager gtmId="G-T2RQ49FPP3" />
      <Header />
      <main>
        <Container>
          <article className="pb-32 pt-4">
            <PostHeader
              title={post.title}
              coverImage={post.coverImagePath}
              date={new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              author={{
                name: post.authorName,
                picture: post.authorImagePath || "/logo.png",
              }}
            />
            <PostBody content={content} />
          </article>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default PostPage;
