"use client";

import React, { useState, useEffect } from "react";
import { BlogContentFormProps } from "@/interfaces/BlogContent";
import SimpleMdeReact from "react-simplemde-editor";
import { markdownToHtml } from "../../utils/markdown";

const BlogContentForm = () => {
  const [contentHtml, setContentHtml] = useState("");
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [authorImage, setAuthorImage] = useState<File | null>(null);

  const handleFormSubmit = () => {
    const formData = {
      title,
      excerpt,
      content,
      authorName,
      coverImage,
      authorImage,
    };

    console.log("Form Data:", formData);
    markdownToHtml(content).then((html: string) => {
      setContentHtml(html);
    });
    console.log("Content HTML:", contentHtml);
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCoverImage(e.target.files[0]);
    }
  };

  const handleAuthorImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAuthorImage(e.target.files[0]);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col space-y-4 bg-white p-8 shadow rounded-lg text-black"
      >
        <input
          className="p-2 border border-gray-300 rounded"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="p-2 border border-gray-300 rounded"
          placeholder="Excerpt"
          rows={3}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />
        <SimpleMdeReact value={content} onChange={setContent} />
        <input
          className="p-2 border border-gray-300 rounded"
          type="text"
          placeholder="Author Name"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
        />
        <div className="file-upload">
          <label className="file-label">
            <input
              className="file-input"
              type="file"
              onChange={handleCoverImageChange}
            />
            Upload Cover Image
          </label>
        </div>
        <div className="file-upload">
          <label className="file-label">
            <input
              className="file-input"
              type="file"
              onChange={handleAuthorImageChange}
            />
            Upload Author Image
          </label>
        </div>
        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BlogContentForm;
