"use client";

import Layout from "@/components/Layout";
import Subscription from "@/components/Subscription";
import FloatingNav from "@/components/FloatingNav";
import AnimatedSection from "@/components/AnimatedSection";
import Main from "./Main";
import Introduction from "./Introduction";
import Skills from "./Skills";
import Projects from "./Projects";
import ResearchInterests from "./ResearchInterests";
import type { HomeSettings, BlogPost, SkillGroup, ResearchInterest } from "@/types/index";

type HomePageProps = {
    homeSettings: HomeSettings;
    blogPosts: BlogPost[];
    skills: SkillGroup[];
    researchInterests: ResearchInterest[];
};

const HomePage = ({ homeSettings, blogPosts, skills, researchInterests }: HomePageProps) => {
    return (
        <Layout classHeader="!absolute top-0 left-0 right-0 z-5" lightHeader>
            <FloatingNav />
            <div id="home">
                <Main homeSettings={homeSettings} />
            </div>
            <AnimatedSection delay={0.1}>
                <Introduction homeSettings={homeSettings} />
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
                <Skills skills={skills} />
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
                <Projects blogPosts={blogPosts} />
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
                <ResearchInterests researchInterests={researchInterests} />
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
                <Subscription />
            </AnimatedSection>
        </Layout>
    );
};

export default HomePage;
