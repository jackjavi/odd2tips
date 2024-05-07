import React from "react";
import ReactMarkdown from "react-markdown";

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <div
      className="max-w-2xl mx-auto text-teal-500 leading-10 tracking-wide first-line:uppercase first-line:tracking-widest
  first-letter:text-7xl first-letter:font-bold 
  first-letter:mr-3 first-letter:float-left"
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
