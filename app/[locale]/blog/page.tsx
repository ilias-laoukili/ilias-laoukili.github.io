import BlogPage from "@/templates/BlogPage";
import { getSortedPostsData } from "@/utils/blog";
import { locales, type Locale } from "@/lib/i18n";
import type { Metadata } from "next";

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

type BlogPageParams = {
    params: { locale: string };
};

export async function generateMetadata({ params }: BlogPageParams): Promise<Metadata> {
    const locale = params.locale as Locale;
    const titles: Record<Locale, string> = {
        en: "Blog - Research & Articles",
        fr: "Blog - Recherche & Articles",
        de: "Blog - Forschung & Artikel",
        es: "Blog - Investigación & Artículos",
        nl: "Blog - Onderzoek & Artikelen",
    };
    const descriptions: Record<Locale, string> = {
        en: "Scientific publications, technical analyses and reflections on AI and cybersecurity by Ilias Laoukili",
        fr: "Publications scientifiques, analyses techniques et réflexions sur l'IA et la cybersécurité par Ilias Laoukili",
        de: "Wissenschaftliche Publikationen, technische Analysen und Gedanken zu KI und Cybersicherheit von Ilias Laoukili",
        es: "Publicaciones científicas, análisis técnicos y reflexiones sobre IA y ciberseguridad por Ilias Laoukili",
        nl: "Wetenschappelijke publicaties, technische analyses en gedachten over AI en cyberbeveiliging door Ilias Laoukili",
    };
    
    return {
        title: titles[locale],
        description: descriptions[locale],
        openGraph: {
            title: titles[locale],
            description: descriptions[locale],
            type: "website",
            locale: locale === "en" ? "en_US" : locale,
        },
        alternates: {
            canonical: `https://ilias-laoukili.github.io/${locale}/blog`,
            languages: {
                "en": "https://ilias-laoukili.github.io/en/blog",
                "fr": "https://ilias-laoukili.github.io/fr/blog",
                "de": "https://ilias-laoukili.github.io/de/blog",
                "es": "https://ilias-laoukili.github.io/es/blog",
                "nl": "https://ilias-laoukili.github.io/nl/blog",
            },
        },
    };
}

const AllPostsPage = ({ params: { locale } }: BlogPageParams) => {

    const allPosts = getSortedPostsData(locale as Locale);

    // Extract unique categories from the posts
    const uniqueCategories = Array.from(new Set(allPosts.map(p => p.category).filter(Boolean))) as string[];
    const categoriesForPage = uniqueCategories.map((cat) => ({
        id: cat,
        title: cat,
    }));

    return <BlogPage blogPosts={allPosts} categories={categoriesForPage} locale={locale as Locale} />;
};

export default AllPostsPage;
