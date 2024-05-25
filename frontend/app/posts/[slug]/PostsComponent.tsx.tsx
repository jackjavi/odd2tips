"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Container from "@/app/blog/_components/container";
import { PostBody } from "@/app/blog/_components/post-body";
import { PostHeader } from "@/app/blog/_components/post-header";
import { getPostBySlug } from "@/lib/api";
import { Post as PostType } from "@/interfaces/post";
import Loading from "@/app/Components/Loading";

const PostsComponent = () => {
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

  const content = post.markdown;

  return (
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
  );
};

export default PostsComponent;
