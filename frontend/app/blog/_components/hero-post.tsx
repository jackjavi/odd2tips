import React from "react";
import Link from "next/link";
import { Post } from "@/interfaces/post";
import Image from "next/image";
import cn from "classnames";

type Props = Post;

export function HeroPost({
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
  let fullAuthorImagePath = "/logo.png";
  if (authorImagePath) {
    fullAuthorImagePath = authorImagePath.startsWith("http")
      ? authorImagePath
      : `${process.env.NEXT_PUBLIC_BASE_PATH}${authorImagePath}`;
  }

  return (
    <section className="hero-post">
      <div className="mb-8">
        <Image
          src={fullCoverImagePath}
          alt={`Cover Image for ${title}`}
          className={cn(
            "shadow-sm w-full md:h-[60vh] object-cover object-top",
            {
              "hover:shadow-lg transition-shadow duration-200": slug,
            }
          )}
          width={1300}
          height={630}
        />
      </div>
      <h3 className="md:text-4xl text-lg md:font-bold font-semibold leading-snug text-[whitesmoke]">
        <Link className="hover:underline" href={`/posts/${slug}`}>
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4 text-slate-300">
        {date}
        <Link className="hover:underline" href={`/posts/${slug}`}>
          <p className="text-slate-300">{excerpt}</p>
        </Link>
        <div className="author flex items-center mt-4">
          <Link className="hover:underline" href={`/posts/${slug}`}>
            <img
              src={fullAuthorImagePath}
              alt={authorName}
              className="w-10 h-10 rounded-full mr-4"
            />
          </Link>
          <span className="text-slate-300">{authorName}</span>
        </div>
      </div>
    </section>
  );
}
