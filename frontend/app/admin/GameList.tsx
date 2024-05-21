"use client";

import React, { useEffect, useState } from "react";
import { Post } from "@/interfaces/post";
import { getAllPosts, deletePostBySlug } from "@/lib/api";

export default function GameList() {
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getAllPosts();
      setAllPosts(posts);
    };

    fetchPosts();
  }, []);

  const deletePost = async (slug: string) => {
    const success = await deletePostBySlug(slug);
    if (success) {
      setAllPosts(allPosts.filter((post) => post.slug !== slug));
    } else {
      console.error("Failed to delete the post");
    }
  };

  return (
    <div className="bg-[whitesmoke]">
      <div className="container mx-auto py-10">
        {allPosts.length > 0 ? (
          allPosts.map((post) => (
            <div
              key={post.slug}
              className="bg-white shadow-md rounded-lg p-4 mb-4"
            >
              <img
                src={post.coverImagePath}
                alt={post.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <h2 className="text-2xl font-bold mt-4">{post.title}</h2>
              <p className="text-gray-600 mt-2">
                {new Date(post.date).toLocaleDateString()}
              </p>
              <button
                onClick={() => deletePost(post.slug)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
}
