"use client";

import Layout from "@/components/Layout";
import ContactCTA from "@/components/ContactCTA";
import FloatingNav from "@/components/FloatingNav";
import dynamic from "next/dynamic";
import Main from "./Main";
import Introduction from "./Introduction";
import type { BlogPost } from "@/types/index";
import type { Locale } from "@/lib/i18n";

// Lazy load below-fold components
const Skills = dynamic(() => import("./Skills"), { ssr: true });
const Projects = dynamic(() => import("./Projects"), { ssr: true });
const ResearchInterests = dynamic(() => import("./ResearchInterests"), { ssr: true });
const Experience = dynamic(() => import("./Experience"), { ssr: true });

type HomePageProps = {
    blogPosts: BlogPost[];
    locale: Locale;
};

const HomePage = ({ blogPosts, locale }: HomePageProps) => {
    return (
        <Layout classHeader="!absolute top-0 left-0 right-0 z-5" lightHeader locale={locale}>
            <FloatingNav locale={locale} />
            <div id="home">
                <Main />
            </div>
            <Introduction />
            <Experience />
            <Skills />
            <Projects blogPosts={blogPosts} locale={locale} />
            <ResearchInterests />
            <ContactCTA />
        </Layout>
    );
};

export default HomePage;
