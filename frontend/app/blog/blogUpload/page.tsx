import React from "react";
import "easymde/dist/easymde.min.css";
import BlogContentForm from "./blogContentForm";

const BlogUpload = async () => {
  return (
    <div className="container mx-auto p-4 text-teal-500">
      <h1 className="text-3xl font-bold text-center mb-6">Upload your Blog</h1>
      <BlogContentForm />
    </div>
  );
};

export default BlogUpload;
