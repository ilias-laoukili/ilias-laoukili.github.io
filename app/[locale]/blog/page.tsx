import BlogPage from "@/templates/BlogPage";
import { getSortedPostsData } from "@/utils/blog";
import { locales, type Locale } from "@/lib/i18n";
import type { Metadata } from "next";

const SITE_URL = "https://ilias.laoukili.com";

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

type BlogPageParams = {
    params: { locale: string };
};

export async function generateMetadata({ params }: BlogPageParams): Promise<Metadata> {
    const locale: Locale = params.locale === "fr" ? "fr" : "en";
    const titles: Record<Locale, string> = {
        en: "Writing — Projects & Technical Notes",
        fr: "Articles — Projets & Notes techniques",
    };
    const descriptions: Record<Locale, string> = {
        en: "Technical write-ups on graph neural networks, Rust/Python ML systems, and applied AI by Ilias Laoukili.",
        fr: "Notes techniques sur les réseaux de neurones sur graphes, les systèmes ML Rust/Python et l'IA appliquée par Ilias Laoukili.",
    };

    return {
        title: titles[locale],
        description: descriptions[locale],
        openGraph: {
            title: titles[locale],
            description: descriptions[locale],
            type: "website",
            locale: locale === "en" ? "en_US" : "fr_CA",
            url: `${SITE_URL}/${locale}/blog`,
        },
        alternates: {
            canonical: `${SITE_URL}/${locale}/blog`,
            languages: {
                en: `${SITE_URL}/en/blog`,
                fr: `${SITE_URL}/fr/blog`,
            },
        },
    };
}

const AllPostsPage = ({ params: { locale } }: BlogPageParams) => {
    const loc: Locale = locale === "fr" ? "fr" : "en";
    const allPosts = getSortedPostsData(loc);
    const uniqueCategories = Array.from(
        new Set(allPosts.map((p) => p.category).filter(Boolean))
    ) as string[];
    const categoriesForPage = uniqueCategories.map((cat) => ({
        id: cat,
        title: cat,
    }));

    return <BlogPage blogPosts={allPosts} categories={categoriesForPage} locale={loc} />;
};

export default AllPostsPage;
