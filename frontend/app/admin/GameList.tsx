import React, { useEffect, useState } from "react";
import PostList from "./PostList";
import { getAllPosts } from "@/lib/api";
import { Post } from "@/interfaces/post";
import Loading from "../Components/Loading";

const GameList: React.FC = async () => {
  const posts = await getAllPosts();

  return <PostList posts={posts} />;
};

export default GameList;
