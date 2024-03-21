import Link from "next/link";
import DateFormatter from "./date-formatter";

// Assuming you've adjusted your Post interface to match the received data structure
import { Post } from "@/interfaces/post";

// Adjust Props to directly use the Post interface, assuming it matches your component's needs
type Props = {
  title: string;
  coverImagePath: string;
  date: string;
  excerpt: string;
  authorName: string;
  authorImagePath: string;
  slug: string;
};

export function PostPreview({
  title,
  coverImagePath,
  date,
  excerpt,
  authorName,
  authorImagePath,
  slug,
}: Props) {
  // Construct the full path for images, assuming they might not always be absolute URLs
  const fullCoverImagePath = coverImagePath.startsWith("http")
    ? coverImagePath
    : `${process.env.NEXT_PUBLIC_BASE_PATH}${coverImagePath}`;
  const fullAuthorImagePath = authorImagePath.startsWith("http")
    ? authorImagePath
    : `${process.env.NEXT_PUBLIC_BASE_PATH}${authorImagePath}`;

  console.log("fullCoverImagePath", fullCoverImagePath);

  return (
    <div>
      <div className="mb-5">
        {/* Adjusted CoverImage component usage according to the provided paths */}
        <img src={fullCoverImagePath} alt={`Cover Image for ${title}`} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/posts/${slug}`}>
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      {/* Adjusted Avatar usage to inline image due to interface changes */}
      <div className="author flex items-center">
        <img
          src={fullAuthorImagePath}
          alt={authorName}
          className="w-10 h-10 rounded-full mr-4"
        />
        <span className="text-gray-700">{authorName}</span>
      </div>
    </div>
  );
}
