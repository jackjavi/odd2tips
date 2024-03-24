"use client";

import { useState } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

export default function BlogUpload() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [authorImage, setAuthorImage] = useState(null);
  const BASE_URL = `https://odd2tips.onrender.com/api/`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("excerpt", excerpt);
    formData.append("content", content);
    formData.append("authorName", authorName);
    formData.append("coverImage", coverImage);
    formData.append("authorImage", authorImage);

    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) {
        alert("Please login to upload a blog");
        return;
      }
      const response = await axios.post(`${BASE_URL}blog/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      alert("Blog uploaded successfully");
      setTitle("");
      setExcerpt("");
      setContent("");
      setAuthorName("");
      setCoverImage(null);
      setAuthorImage(null);
    } catch (error) {
      console.error("Error uploading blog", error);
      alert("Error uploading blog");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-semibold text-center mb-6 text-gray-700">
            Upload Blog Content
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4 text-gray-700">
            <input
              className="w-full p-4 border border-gray-300 rounded-md"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="w-full p-4 border border-gray-300 rounded-md"
              placeholder="Excerpt"
              rows="2"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
            ></textarea>
            <textarea
              className="w-full p-4 border border-gray-300 rounded-md"
              placeholder="Content"
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <input
              className="w-full p-4 border border-gray-300 rounded-md"
              type="text"
              placeholder="Author Name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
            />
            <div className="flex gap-4">
              <input
                className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                type="file"
                onChange={(e) => setCoverImage(e.target.files[0])}
              />
              <input
                className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                type="file"
                onChange={(e) => setAuthorImage(e.target.files[0])}
              />
            </div>
            <button
              className="w-full bg-blue-600 text-white p-4 rounded hover:bg-blue-700 transition-colors duration-200"
              type="submit"
            >
              Upload Blog
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
