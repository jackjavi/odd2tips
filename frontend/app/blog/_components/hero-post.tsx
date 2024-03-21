import React from "react";
import DateFormatter from "./date-formatter";
import CoverImage from "./cover-image";
import Link from "next/link";

// Adjusted Props Type to match your Post interface
type Props = {
  title: string;
  coverImagePath: string; // Adjusted from coverImage
  date: string;
  excerpt: string;
  authorName: string; // Adjusted from author
  slug: string;
};

export const HeroPost: React.FC<Props> = ({
  title,
  coverImagePath,
  date,
  excerpt,
  authorName,
  slug,
}) => {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} src={coverImagePath} slug={slug} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link href={`/posts/${slug}`}>
              <a className="hover:underline">{title}</a>
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <DateFormatter dateString={date} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          <p>{authorName}</p> {/* Displaying authorName */}
        </div>
      </div>
    </section>
  );
};
