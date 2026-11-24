import HomePage from "@/templates/HomePage";
import { getSortedPostsData } from "@/utils/blog";
import { locales, type Locale } from "@/lib/i18n";
import type { Metadata } from "next";

const SITE_URL = "https://ilias.laoukili.com";

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

type HomePageParams = {
    params: { locale: string };
};

export async function generateMetadata({ params }: HomePageParams): Promise<Metadata> {
    const locale: Locale = params.locale === "fr" ? "fr" : "en";
    const isFr = locale === "fr";
    const title = isFr
        ? "Ilias Laoukili — IA, Cybersécurité & Systèmes ML"
        : "Ilias Laoukili — AI, Cybersecurity & ML Systems";
    const description = isFr
        ? "Ilias Laoukili — Conseiller en IA au ministère de la Cybersécurité et du Numérique (MCN), étudiant à la maîtrise recherche (M.Sc.) à l'Université Laval et élève-ingénieur à ESIEE Paris."
        : "Ilias Laoukili — AI Advisor at Ministère de la Cybersécurité et du Numérique (MCN), M.Sc. Computer Science & AI researcher at Université Laval, and ESIEE Paris engineering student.";

    return {
        title: { absolute: title },
        description,
        openGraph: {
            title,
            description,
            url: `${SITE_URL}/${locale}/`,
            locale: isFr ? "fr_CA" : "en_US",
            type: "website",
            images: [
                {
                    url: `${SITE_URL}/images/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [`${SITE_URL}/images/og-image.png`],
        },
        alternates: {
            canonical: `${SITE_URL}/${locale}/`,
            languages: {
                en: `${SITE_URL}/en/`,
                fr: `${SITE_URL}/fr/`,
            },
        },
    };
}

const Home = ({ params: { locale } }: HomePageParams) => {
    const loc: Locale = locale === "fr" ? "fr" : "en";
    const posts = getSortedPostsData(loc);

    return <HomePage blogPosts={posts} locale={loc} />;
};

export default Home;
