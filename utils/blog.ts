import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost } from "@/types";
import { PROJECTS } from "@/constants/data";
import type { Locale } from "@/lib/i18n";

const postsDirectory = path.join(process.cwd(), "_posts");

export function getSortedPostsData(locale: Locale = 'en'): BlogPost[] {
    // Use PROJECTS from data.ts as the source of truth for the list
    return PROJECTS.map(project => ({
        slug: project.slug,
        title: project.title,
        publishedAt: project.date,
        category: project.category,
        excerpt: project.excerpt,
        mainImage: project.imageUrl,
        tags: project.tags,
        content: "", // Content is not needed for the list view
        extraImage: project.extraImage,
    })).sort((a, b) => ((a.publishedAt ?? "") < (b.publishedAt ?? "") ? 1 : -1));
}

export async function getPostData(slug: string, locale: Locale = 'en'): Promise<{ article: BlogPost, similarArticles: BlogPost[] }> {
    // Find the project metadata
    const project = PROJECTS.find(p => p.slug === slug);

    if (!project) {
        throw new Error(`Post with slug "${slug}" not found in data.ts.`);
    }

    // Try to read the localized markdown file first, then fall back to default
    const localizedPath = path.join(postsDirectory, locale, `${slug}.md`);
    const defaultPath = path.join(postsDirectory, `${slug}.md`);
    let content = "";
    
    try {
        // First try localized version
        if (fs.existsSync(localizedPath)) {
            const fileContents = fs.readFileSync(localizedPath, "utf8");
            const matterResult = matter(fileContents);
            content = matterResult.content;
        } 
        // Fall back to default (English) version
        else if (fs.existsSync(defaultPath)) {
            const fileContents = fs.readFileSync(defaultPath, "utf8");
            const matterResult = matter(fileContents);
            content = matterResult.content;
        } else {
             // Fallback if file doesn't exist but data entry does
             content = project.excerpt; 
        }
    } catch (e) {
        console.warn(`Could not read markdown file for ${slug}`, e);
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
    };
    
    const allPosts = getSortedPostsData(locale);
    
    // Prioritize articles in the same category
    let similarArticles = allPosts
        .filter(p => p.slug !== slug && p.category === article.category)
        .slice(0, 3);

    // If we don't have 3 yet, fill with other recent posts
    if (similarArticles.length < 3) {
        const otherArticles = allPosts
            .filter(p => p.slug !== slug && !similarArticles.includes(p))
            .slice(0, 3 - similarArticles.length);
        similarArticles = [...similarArticles, ...otherArticles];
    }

    return { article, similarArticles };
}