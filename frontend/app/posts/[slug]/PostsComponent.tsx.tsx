import { useParams } from "next/navigation";
import Container from "@/app/blog/_components/container";
import { PostBody } from "@/app/blog/_components/post-body";
import { PostHeader } from "@/app/blog/_components/post-header";
import { getPostBySlug } from "@/lib/api";
import { Post as PostType } from "@/interfaces/post";
import Loading from "@/app/Components/Loading";

const PostsComponent = ({ post }) => {
  const content = post.markdown;

  return (
    <Container>
      <article className="pb-32 pt-4">
        <PostHeader
          title={post.title}
          coverImage={post.coverImagePath}
          date={new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          author={{
            name: post.authorName,
            picture: post.authorImagePath || "/logo.png",
          }}
        />
        <PostBody content={content} />
      </article>
    </Container>
  );
};

export default PostsComponent;
