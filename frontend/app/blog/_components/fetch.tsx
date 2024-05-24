import { getAllPosts } from "@/lib/api";
import { Post } from "@/interfaces/post";
import { HeroPost } from "@/app/blog/_components/hero-post";
import { MoreStories } from "@/app/blog/_components/more-stories";

const Fetch: React.FC = async () => {
  const allPosts = await getAllPosts();

  const heroPost = allPosts[0] || {};
  console.log("heroPost", heroPost);
  const morePosts = allPosts.length > 1 ? allPosts.slice(1) : [];

  return (
    <>
      <HeroPost post={heroPost} />
      <MoreStories posts={morePosts} />
    </>
  );
};

export default Fetch;
