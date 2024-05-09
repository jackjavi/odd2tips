"use client";

import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { markdownToHtml } from "../../utils/markdown";
import Markdown from "react-markdown";
import { CodeBlock } from "../_components/Code";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import rehypeExternalLinks from "rehype-external-links";
import { handleFileUploader } from "@/app/utils/handleFileUploader";

const BlogContentForm: React.FC = () => {
  const [contentHtml, setContentHtml] = useState("");
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [authorImage, setAuthorImage] = useState<File | null>(null);
  const [contentImage, setContentImage] = useState<File>();

  const options = { code: CodeBlock };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const html = await markdownToHtml(content);
    console.log(html);
    setContentHtml(html);
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      try {
        const url = await handleFileUploader(e.target.files[0]);

        setContent((prevContent) => `${prevContent}\n![${file.name}](${url})`);
        console.log("File uploaded successfully", url.url);
      } catch (error) {
        console.error("Error uploading file", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleFormSubmit} className="w-full max-w-screen-sm">
        <div className="flex flex-wrap -mx-3 mb-6">
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
          <div className="w-full px-3">
            <SimpleMDE value={content} onChange={setContent} />
          </div>
          <input
            className="p-2 border border-gray-300 rounded"
            type="text"
            placeholder="Author Name"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Upload Image to get back link
            </label>
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100"
            />
          </div>
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
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Convert to HTML
          </button>
        </div>
      </form>

      {contentHtml && (
        <div className="w-full max-w-screen-sm mt-8">
          <h2 className="text-xl font-bold mb-4">Markdown Preview:</h2>
          <Markdown
            className="prose prose-invert min-w-full"
            components={options}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
              rehypeSanitize,
              [rehypeExternalLinks, { content: { type: "text", value: "🔗" } }],
            ]}
          >
            {content}
          </Markdown>
        </div>
      )}
    </div>
  );
};

export default BlogContentForm;
