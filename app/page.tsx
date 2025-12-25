import type { NextPage } from "next";
import HomePage from "@/templates/HomePage";
import { PROFILE, STATS, SKILLS, RESEARCH_INTERESTS } from "@/constants/data";
import { getSortedPostsData } from "@/utils/blog";
import type { HomeSettings, SkillGroup, ResearchInterest } from "@/types/index";

const Home: NextPage = () => {
    const posts = getSortedPostsData();

    const homeSettings: HomeSettings = {
        description: PROFILE.subtitle,
        role: PROFILE.title,
        title: PROFILE.name,
        introduction: PROFILE.introduction,
        stats: STATS,
        cvPath: PROFILE.cvPath,
    };

    const skills: SkillGroup[] = SKILLS.map((s, i) => ({
        _id: String(i),
        category: s.category,
        items: s.items
    }));

    const researchInterests: ResearchInterest[] = RESEARCH_INTERESTS.map((r, i) => ({
        _id: String(i),
        icon: r.icon,
        description: r.description,
        title: r.title
    }));

    return (
        <HomePage
            homeSettings={homeSettings}
            blogPosts={posts}
            skills={skills}
            researchInterests={researchInterests}
        />
    );
};

export default Home;
