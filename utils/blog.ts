import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost } from "@/types";
import { PROJECTS } from "@/constants/data";
import type { Locale } from "@/lib/i18n";

const postsDirectory = path.join(process.cwd(), "_posts");

export function getSortedPostsData(locale: Locale = 'en'): BlogPost[] {
    return PROJECTS.map(project => ({
        slug: project.slug,
        title: project.title,
        publishedAt: project.date,
        category: project.category,
        excerpt: project.excerpt,
        mainImage: project.imageUrl,
        tags: project.tags,
        content: "",
        extraImage: project.extraImage,
        demoUrl: project.demoUrl,
        githubUrl: project.githubUrl,
    })).sort((a, b) => ((a.publishedAt ?? "") < (b.publishedAt ?? "") ? 1 : -1));
}

export async function getPostData(slug: string, locale: Locale = 'en'): Promise<{ article: BlogPost, similarArticles: BlogPost[] }> {
    const safeSlug = slug.replace(/[^a-zA-Z0-9-]/g, '');

    const project = PROJECTS.find(p => p.slug === safeSlug);

    if (!project) {
        throw new Error(`Post with slug "${safeSlug}" not found in data.ts.`);
    }

    const localizedPath = path.join(postsDirectory, locale, `${safeSlug}.md`);
    const defaultPath = path.join(postsDirectory, `${safeSlug}.md`);
    let content = "";

    try {
        if (fs.existsSync(localizedPath)) {
            const fileContents = fs.readFileSync(localizedPath, "utf8");
            const matterResult = matter(fileContents);
            content = matterResult.content;
        } else if (fs.existsSync(defaultPath)) {
            const fileContents = fs.readFileSync(defaultPath, "utf8");
            const matterResult = matter(fileContents);
            content = matterResult.content;
        } else {
            content = project.excerpt;
        }
    } catch (e) {
        console.warn(`Could not read markdown file for ${safeSlug}`, e);
        content = project.excerpt;
    }

    const article: BlogPost = {
        slug: project.slug,
        title: project.title,
        publishedAt: project.date,
        category: project.category,
        excerpt: project.excerpt,
        mainImage: project.imageUrl,
        tags: project.tags,
        content: content,
        extraImage: project.extraImage,
        demoUrl: project.demoUrl,
        githubUrl: project.githubUrl,
    };

    const allPosts = getSortedPostsData(locale);

    let similarArticles = allPosts
        .filter(p => p.slug !== slug && p.category === article.category)
        .slice(0, 3);

    if (similarArticles.length < 3) {
        const similarSlugs = new Set(similarArticles.map(s => s.slug));
        const otherArticles = allPosts
            .filter(p => p.slug !== slug && !similarSlugs.has(p.slug))
            .slice(0, 3 - similarArticles.length);
        similarArticles = [...similarArticles, ...otherArticles];
    }

    return { article, similarArticles };
}
