import React from "react";
import DateFormatter from "./date-formatter";
import Link from "next/link";
import { Post } from "@/interfaces/post";

// Adjusting Props to directly use the Post interface
type Props = Post; // If you have adjusted your Post interface accordingly

export function HeroPost({
  title,
  coverImagePath,
  date,
  excerpt,
  authorName,
  authorImagePath,
  slug,
}: Props) {
  // Prepending the base path to image paths if not already an absolute URL
  const fullCoverImagePath = coverImagePath.startsWith("http")
    ? coverImagePath
    : `${process.env.NEXT_PUBLIC_BASE_PATH}${coverImagePath}`;
  const fullAuthorImagePath = authorImagePath.startsWith("http")
    ? authorImagePath
    : `${process.env.NEXT_PUBLIC_BASE_PATH}${authorImagePath}`;

  console.log("fullCoverImagePath", fullCoverImagePath);

  return (
    <section className="hero-post">
      <div className="mb-8">
        <img
          src={fullCoverImagePath}
          alt={`Cover Image for ${title}`}
          className="cover-image"
        />
      </div>
      <h3 className="text-4xl font-bold leading-snug">
        <Link className="hover:underline" href={`/posts/${slug}`}>
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
        <p className="text-gray-500">{excerpt}</p>
        <div className="author flex items-center mt-4">
          <img
            src={fullAuthorImagePath}
            alt={authorName}
            className="w-10 h-10 rounded-full mr-4"
          />
          <span className="text-gray-700">{authorName}</span>
        </div>
      </div>
    </section>
  );
}
