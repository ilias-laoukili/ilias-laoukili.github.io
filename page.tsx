import { getSortedPostsData, getPostData } from "@/utils/blog";
import BlogDetailPage from "@/templates/BlogDetailPage";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
    params: {
        slug: string;
    };
};

// This generates the static pages at build time
export async function generateStaticParams() {
    const posts = getSortedPostsData();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const allPosts = getSortedPostsData();
    const post = allPosts.find(p => p.slug === params.slug);

    if (!post) {
        return { title: "Post Not Found" };
    }

    return { title: post.title, description: post.excerpt };
}

const PostPage = async ({ params }: Props) => {
    try {
        const { article, similarArticles } = await getPostData(params.slug);
        return <BlogDetailPage article={article} similarArticles={similarArticles} />;
    } catch (error) {
        notFound();
    }
};

export default PostPage;