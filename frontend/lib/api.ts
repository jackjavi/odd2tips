import axios from "axios";
import { Post } from "@/interfaces/post";

const BASE_URL = "http://localhost:8888";
// const BASE_URL = "https://odd2tips.onrender.com";

export async function getAllPosts(): Promise<Post[]> {
  try {
    const response = await axios.get(`${BASE_URL}/api/blog/posts-test`);

    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const response = await axios.get(`${BASE_URL}/api/blog/posts-test/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post by slug (${slug}):`, error);
    return null;
  }
}

export async function deletePostBySlug(slug: string): Promise<boolean> {
  try {
    await axios.delete(`${BASE_URL}/api/blog/posts-test/${slug}`);
    return true;
  } catch (error) {
    console.error(`Error deleting post by slug (${slug}):`, error);
    return false;
  }
}

export async function addToTwitterDB(post: Post): Promise<boolean> {
  try {
    await axios.post(`${BASE_URL}/api/blog/add-to-twitter-db`, { post });
    return true;
  } catch (error) {
    console.error(`Error adding post to Twitter DB:`, error);
    return false;
  }
}
