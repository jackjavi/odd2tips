import React from "react";
import ReactMarkdown from "react-markdown";

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <div className="max-w-2xl mx-auto text-teal-500 leading-10 tracking-wide">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
