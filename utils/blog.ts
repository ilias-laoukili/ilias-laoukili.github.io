import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost } from "@/types";
import { PROJECTS } from "@/constants/data";
import type { Locale } from "@/lib/i18n";

const postsDirectory = path.join(process.cwd(), "_posts");

export function getSortedPostsData(locale: Locale = "en"): BlogPost[] {
    const loc = locale === "fr" ? "fr" : "en";
    return PROJECTS.map((project) => ({
        slug: project.slug,
        title: project.title[loc],
        publishedAt: project.date,
        category: project.category[loc],
        excerpt: project.excerpt[loc],
        mainImage: project.imageUrl,
        imageAlt: project.imageAlt[loc],
        imageCaption: project.imageCaption?.[loc],
        coverVideo: project.coverVideo,
        tags: project.tags,
        content: "",
        extraImage: project.extraImage,
        demoUrl: project.demoUrl,
        githubUrl: project.githubUrl,
    })).sort((a, b) => ((a.publishedAt ?? "") < (b.publishedAt ?? "") ? 1 : -1));
}

export async function getPostData(
    slug: string,
    locale: Locale = "en"
): Promise<{ article: BlogPost; similarArticles: BlogPost[] }> {
    const loc = locale === "fr" ? "fr" : "en";
    const safeSlug = slug.replace(/[^a-zA-Z0-9-]/g, "");
    const project = PROJECTS.find((p) => p.slug === safeSlug);

    if (!project) {
        throw new Error(`Post with slug "${safeSlug}" not found in data.ts.`);
    }

    const localizedPath = path.join(postsDirectory, loc, `${safeSlug}.md`);
    const fallbackPath = path.join(postsDirectory, "en", `${safeSlug}.md`);
    let content = "";

    try {
        if (fs.existsSync(localizedPath)) {
            content = matter(fs.readFileSync(localizedPath, "utf8")).content;
        } else if (fs.existsSync(fallbackPath)) {
            content = matter(fs.readFileSync(fallbackPath, "utf8")).content;
        } else {
            content = project.excerpt[loc];
        }
    } catch (e) {
        console.warn(`Could not read markdown file for ${safeSlug}`, e);
        content = project.excerpt[loc];
    }

    // Avoid duplicate H1 when the page header already renders the article title
    content = content.replace(/^\s*#\s+[^\n]+\n+/, "");
    // Ensure strict heading outline (h1 -> h2) when markdown body starts at ### without ##
    if (!/^##\s+/m.test(content) && /^###\s+/m.test(content)) {
        content = content.replace(/^###\s+/gm, "## ");
    }

    const article: BlogPost = {
        slug: project.slug,
        title: project.title[loc],
        publishedAt: project.date,
        category: project.category[loc],
        excerpt: project.excerpt[loc],
        mainImage: project.imageUrl,
        imageAlt: project.imageAlt[loc],
        imageCaption: project.imageCaption?.[loc],
        coverVideo: project.coverVideo,
        tags: project.tags,
        content,
        extraImage: project.extraImage,
        demoUrl: project.demoUrl,
        githubUrl: project.githubUrl,
    };

    const allPosts = getSortedPostsData(loc);
    const similarArticles = allPosts.filter((p) => p.slug !== safeSlug).slice(0, 2);

    return { article, similarArticles };
}
