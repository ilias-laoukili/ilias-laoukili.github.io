import { getSortedPostsData, getPostData } from "@/utils/blog";
import BlogDetailPage from "@/templates/BlogDetailPage";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { locales, isValidLocale, type Locale } from "@/lib/i18n";

const SITE_URL = "https://ilias.laoukili.com";

type Props = {
    params: {
        slug: string;
        locale: string;
    };
};

export async function generateStaticParams() {
    const params: { locale: string; slug: string }[] = [];
    for (const locale of locales) {
        const posts = getSortedPostsData(locale);
        for (const post of posts) {
            params.push({ locale, slug: post.slug });
        }
    }
    return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const locale: Locale = isValidLocale(params.locale) ? params.locale : "en";
    const allPosts = getSortedPostsData(locale);
    const post = allPosts.find((p) => p.slug === params.slug);

    if (!post) {
        return { title: "Post Not Found" };
    }

    const url = `${SITE_URL}/${locale}/blog/${params.slug}/`;
    const ogImage =
        params.slug === "plekton"
            ? `${SITE_URL}/images/og-plekton.png`
            : params.slug === "manis"
              ? `${SITE_URL}/images/og-manis.png`
              : post.mainImage
                ? `${SITE_URL}${post.mainImage}`
                : `${SITE_URL}/images/og-image.png`;

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
            locale: locale === "en" ? "en_US" : "fr_CA",
            url,
            images: [
                {
                    url: ogImage,
                    width: 1280,
                    height: 640,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: [ogImage],
        },
        alternates: {
            canonical: url,
            languages: {
                en: `${SITE_URL}/en/blog/${params.slug}/`,
                fr: `${SITE_URL}/fr/blog/${params.slug}/`,
            },
        },
    };
}

const PostPage = async ({ params }: Props) => {
    const locale: Locale = isValidLocale(params.locale) ? params.locale : "en";
    try {
        const { article, similarArticles } = await getPostData(params.slug, locale);
        return <BlogDetailPage article={article} similarArticles={similarArticles} locale={locale} />;
    } catch (error) {
        console.error(`Failed to load post "${params.slug}":`, error);
        notFound();
    }
};

export default PostPage;
