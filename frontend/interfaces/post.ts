export type Post = {
  title: string | null;
  date: string;
  excerpt: string | null;
  slug: string | null;
  content: string | null;
  authorName: string | null;
  coverImagePath: string;
  authorImagePath: string | null;
  markdown: string | null;
};
