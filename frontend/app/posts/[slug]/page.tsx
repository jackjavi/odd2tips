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

const PostPage = () => {
  const [post, setPost] = useState<PostType | null>(null);
  const { slug } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      if (typeof slug === "string") {
        const fetchedPost = await getPostBySlug(slug);
        setPost(fetchedPost);
      }
    };
    fetchPost();
  }, [slug]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const content = post.content;

  return (
    <div className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-slate-900 hover:to-slate-500">
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
              author={{ name: post.authorName, picture: post.authorImagePath }}
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
