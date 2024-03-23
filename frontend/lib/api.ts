import axios from "axios";
import { Post } from "@/interfaces/post";

const BASE_URL = `https://odd2tips.onrender.com/api/`;

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
    console.log(BASE_URL);
    const response = await axios.get(`${BASE_URL}blog/posts`);

    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const headers = getAuthorizationHeader();
    const response = await axios.get(`${BASE_URL}blog/posts/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post by slug (${slug}):`, error);
    return null;
  }
}
