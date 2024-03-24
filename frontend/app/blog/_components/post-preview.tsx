// PostPreview component
import React from "react";
import Link from "next/link";
import DateFormatter from "./date-formatter";
import { Post } from "@/interfaces/post";

type Props = Post;

export function PostPreview({
  title,
  coverImagePath,
  date,
  excerpt,
  authorName,
  authorImagePath,
  slug,
}: Props) {
  const fullCoverImagePath = coverImagePath.startsWith("http")
    ? coverImagePath
    : `${process.env.NEXT_PUBLIC_BASE_PATH}${coverImagePath}`;
  const fullAuthorImagePath = authorImagePath.startsWith("http")
    ? authorImagePath
    : `${process.env.NEXT_PUBLIC_BASE_PATH}${authorImagePath}`;

  return (
    <div className="post-preview">
      <div className="mb-5">
        <img
          src={fullCoverImagePath}
          alt={`Cover Image for ${title}`}
          className="cover-image"
        />
      </div>
      <h3 className="text-3xl mb-3 leading-snug text-[whitesmoke]">
        <Link className="hover:underline" href={`/posts/${slug}`}>
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4 text-slate-300">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4 text-slate-400">{excerpt}</p>
      <div className="author flex items-center">
        <img
          src={fullAuthorImagePath}
          alt={authorName}
          className="w-10 h-10 rounded-full mr-4"
        />
        <span className="text-slate-300">{authorName}</span>
      </div>
    </div>
  );
}
