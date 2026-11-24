"use client";

import Layout from "@/components/Layout";
import Main from "./Main";
import Experience from "./Experience";
import Projects from "./Projects";
import Skills from "./Skills";
import type { BlogPost } from "@/types";
import type { Locale } from "@/lib/i18n";

type HomePageProps = {
    blogPosts: BlogPost[];
    locale: Locale;
};

const HomePage = ({ blogPosts, locale }: HomePageProps) => {
    return (
        <Layout locale={locale}>
            <div id="home">
                <Main locale={locale} />
            </div>
            <Experience locale={locale} />
            <Projects blogPosts={blogPosts} locale={locale} />
            <Skills locale={locale} />
        </Layout>
    );
};

export default HomePage;
