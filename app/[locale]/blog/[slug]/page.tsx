import { getSortedPostsData, getPostData } from "@/utils/blog";
import BlogDetailPage from "@/templates/BlogDetailPage";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { locales, isValidLocale, type Locale } from "@/lib/i18n";

type Props = {
    params: {
        slug: string;
        locale: string;
    };
};

// This generates the static pages at build time
export async function generateStaticParams() {
    const params: { locale: string; slug: string }[] = [];
    
    for (const locale of locales) {
        const posts = getSortedPostsData(locale);
        for (const post of posts) {
            params.push({
                locale,
                slug: post.slug,
            });
        }
    }
    
    return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const locale = params.locale as Locale;
    const allPosts = getSortedPostsData(locale);
    const post = allPosts.find(p => p.slug === params.slug);

    if (!post) {
        return { title: "Post Not Found" };
    }

    const url = `https://ilias-laoukili.github.io/${locale}/blog/${params.slug}`;

    return {
        title: post.title,
        description: post.excerpt,
        authors: [{ name: "Ilias Laoukili" }],
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            publishedTime: post.publishedAt,
            authors: ["Ilias Laoukili"],
            tags: post.tags,
            locale: locale === "en" ? "en_US" : locale,
            url,
            images: post.mainImage ? [
                {
                    url: post.mainImage,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ] : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: post.mainImage ? [post.mainImage] : undefined,
        },
        alternates: {
            canonical: url,
        },
    };
}

const PostPage = async ({ params }: Props) => {
    const locale: Locale = isValidLocale(params.locale) ? params.locale : 'en';

    try {
        const { article, similarArticles } = await getPostData(params.slug, locale);
        return <BlogDetailPage article={article} similarArticles={similarArticles} locale={locale} />;
    } catch (error) {
        console.error(`Failed to load post "${params.slug}":`, error);
        notFound();
    }
};

export default PostPage;
