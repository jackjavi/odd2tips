// MoreStories component
import React from "react";
import { Post } from "@/interfaces/post";
import { PostPreview } from "./post-preview";

type Props = {
  posts: Post[];
};

export function MoreStories({ posts }: Props) {
  return (
    <section>
      <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.coverImagePath}
            title={post.title}
            coverImagePath={post.coverImagePath}
            date={post.date}
            excerpt={post.excerpt}
            authorName={post.authorName}
            authorImagePath={post.authorImagePath}
            slug={post.slug}
          />
        ))}
      </div>
    </section>
  );
}
