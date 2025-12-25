import BlogPage from "@/templates/BlogPage";
import { getSortedPostsData } from "@/utils/blog";

export const metadata = {
  title: "Blog",
  description: "Read my thoughts on software development, AI, and more.",
};

const AllPostsPage = () => {
  const allPosts = getSortedPostsData();
  
  // Extract unique categories from the posts
  const uniqueCategories = Array.from(new Set(allPosts.map(p => p.category).filter(Boolean))) as string[];
  const categoriesForPage = uniqueCategories.map((cat) => ({
    id: cat,
    title: cat,
  }));

  return <BlogPage blogPosts={allPosts} categories={categoriesForPage} />;
};

export default AllPostsPage;