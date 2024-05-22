import axios from "axios";
import { Post } from "@/interfaces/post";

function getAuthorizationHeader() {
  const tokenString = localStorage.getItem("token");
  if (!tokenString) {
    return undefined;
  }

  try {
    const token = JSON.parse(tokenString);
    return { Authorization: `Bearer ${token}` };
  } catch (error) {
    console.error("Error parsing token:", error);
    return undefined;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const headers = getAuthorizationHeader();
    const response = await axios.get(`/api/blog/posts-test`);

    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const headers = getAuthorizationHeader();
    const response = await axios.get(`/api/blog/posts-test/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post by slug (${slug}):`, error);
    return null;
  }
}

export async function deletePostBySlug(slug: string): Promise<boolean> {
  try {
    const headers = getAuthorizationHeader();
    await axios.delete(`/api/blog/posts-test/${slug}`, { headers });
    return true;
  } catch (error) {
    console.error(`Error deleting post by slug (${slug}):`, error);
    return false;
  }
}

export async function addToTwitterDB(post: Post): Promise<boolean> {
  try {
    const headers = getAuthorizationHeader();
    await axios.post(`/api/blog/add-to-twitter-db`, { post }, { headers });
    return true;
  } catch (error) {
    console.error(`Error adding post to Twitter DB:`, error);
    return false;
  }
}
