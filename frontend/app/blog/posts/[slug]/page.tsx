// Assuming these imports are correct and exist
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Alert from "@/app/blog/_components/alert";
import Container from "@/app/blog/_components/container";
import Header from "@/app/blog/_components/header";
import { PostBody } from "@/app/blog/_components/post-body";
import { PostHeader } from "@/app/blog/_components/post-header";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { Post as PostType } from "@/interfaces/post";

const PostPage = () => {
  const [post, setPost] = useState<PostType | null>(null);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const fetchPost = async () => {
      if (typeof slug === "string") {
        const fetchedPost = await getPostBySlug(slug);
        setPost(fetchedPost);
      }
    };
    fetchPost();
  }, [slug]);

  if (!post) {
    return <div>Loading...</div>; // Or any other loading state
  }

  // Assume markdownToHtml is adjusted or replaced as needed
  const content = post.content; // Directly using the fetched content

  return (
    <main>
      {/*<Alert preview={post.preview} />*/}
      <Container>
        <Header />
        <article className="mb-32">
          <PostHeader
            title={post.title}
            coverImage={post.coverImagePath}
            date={new Date(post.date).toLocaleDateString()}
            author={{ name: post.authorName, picture: post.authorImagePath }}
          />
          <PostBody content={content} />
        </article>
      </Container>
    </main>
  );
};

export default PostPage;
