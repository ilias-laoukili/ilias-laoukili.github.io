import HomePage from "@/templates/HomePage";
import { getSortedPostsData } from "@/utils/blog";
import { locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

type HomePageParams = {
    params: { locale: string };
};

const Home = ({ params: { locale } }: HomePageParams) => {
    const posts = getSortedPostsData(locale as Locale);

    return (
        <HomePage
            blogPosts={posts}
            locale={locale as Locale}
        />
    );
};

export default Home;
