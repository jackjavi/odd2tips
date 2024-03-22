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
            key={post._id} // Using _id for key
            title={post.title}
            coverImagePath={post.coverImagePath}
            date={post.date}
            excerpt={post.excerpt} // Assuming excerpt is a part of your content
            authorName={post.authorName}
            authorImagePath={post.authorImagePath}
            slug={post._id} // Assuming _id as slug, adjust as necessary
          />
        ))}
      </div>
    </section>
  );
}
