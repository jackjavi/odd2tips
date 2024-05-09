"use client";

import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { markdownToHtml } from "../../utils/markdown";

const BlogContentForm = () => {
  const [contentHtml, setContentHtml] = useState("");
  const [content, setContent] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const html = await markdownToHtml(content);
    setContentHtml(html);
  };

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleFormSubmit} className="w-full max-w-screen-sm">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <SimpleMDE value={content} onChange={setContent} />
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
          <h2 className="text-xl font-bold mb-4">HTML Preview:</h2>
          {contentHtml.length > 0 ? (
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          ) : (
            <p>No content</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogContentForm;
