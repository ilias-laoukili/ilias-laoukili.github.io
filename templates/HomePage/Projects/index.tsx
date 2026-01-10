"use client";

import Image from "@/components/Image";
import Link from "next/link";
import { motion } from "motion/react";
import { memo, useMemo } from "react";
import { useTranslations } from "@/lib/i18n/client";
import type { BlogPost } from "@/types/index";
import type { Locale } from "@/lib/i18n";

type ProjectsProps = {
    blogPosts: BlogPost[];
    locale: Locale;
};

type ProjectCardProps = {
    article: BlogPost;
    blogPath: string;
    locale: Locale;
    index: number;
};

// Memoized card component to prevent unnecessary re-renders
const ProjectCard = memo(({ article, blogPath, locale, index }: ProjectCardProps) => {
    // Memoize date formatting to avoid recalculation on re-render
    const formattedDate = useMemo(() => {
        return new Date(article.publishedAt || Date.now()).toLocaleDateString(
            locale === 'en' ? 'en-US' : locale,
            { year: "numeric", month: "long", day: "numeric" }
        );
    }, [article.publishedAt, locale]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2, margin: "-50px" }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.4, 0.25, 1],
            }}
            className="w-full h-full"
        >
            <Link
                href={`${blogPath}/${article.slug}`}
                className="group relative bg-white dark:bg-black rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-green-500/50 transition-colors duration-300 flex flex-col w-full h-full"
            >
                {/* Scanline overlay effect on hover (dark mode only) */}
                <div className="absolute inset-0 bg-green-500/5 opacity-0 dark:group-hover:opacity-100 pointer-events-none transition-opacity duration-300 z-10 mix-blend-overlay" />
                
                {/* Subtle glow effect (dark mode only) */}
                <div className="absolute inset-0 opacity-0 dark:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl dark:shadow-[0_0_30px_rgba(34,197,94,0.15)]" />

                {/* Light mode hover shadow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 dark:opacity-0 dark:group-hover:opacity-0 transition-opacity duration-300 pointer-events-none rounded-xl shadow-lg" />

                <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-900">
                    <Image
                        className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105 group-hover:will-change-transform"
                        src={article.mainImage || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"}
                        width={400}
                        height={200}
                        alt={`Cover image for ${article.title}`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDAwUBAAAAAAAAAAAAAQIDAAQRBQYhEhMiMUFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEQA/ANa3Fd2kFvYWsV9aTyTRJI7RSqwUkZAyP1jPNZVJNK0jMZpCxYkkvk5J+nNKVLq4iSyBc5f/2Q=="
                    />
                    {/* Image overlay gradient (dark mode only) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 dark:opacity-100" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 mb-3 text-caption text-gray-500 dark:text-gray-400 h-6">
                        {article.category && (
                            <span 
                                className="px-3 py-0.5 border rounded-lg font-medium text-[12px] bg-blue-500/10 border-blue-500/50 text-blue-600 dark:bg-green-500/10 dark:border-green-500/50 dark:text-green-400"
                            >
                                {article.category}
                            </span>
                        )}
                        <span>{formattedDate}</span>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-green-400 transition-colors duration-200">
                        {article.title}
                    </h3>

                    <p className="text-body text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-grow">
                        {article.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                        {article.tags?.slice(0, 3).map((tag: string, tagIndex: number) => (
                            <span
                                key={tagIndex}
                                className="px-3 py-1 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-caption text-gray-600 dark:text-gray-400"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    {article.demoUrl && (
                        <a
                            href={article.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-500 dark:bg-green-500/20 border border-blue-500 dark:border-green-500/50 text-white dark:text-green-400 rounded-full text-sm font-medium transition-colors duration-200 hover:bg-blue-600 dark:hover:bg-green-500/30 dark:hover:border-green-500"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Try Live Demo
                        </a>
                    )}
                </div>
            </Link>
        </motion.div>
    );
});

ProjectCard.displayName = 'ProjectCard';

const Projects = ({ blogPosts, locale }: ProjectsProps) => {
    const { t } = useTranslations('home.projects');
    const blogPath = locale === 'en' ? '/blog' : `/${locale}/blog`;

    // Memoize the visible posts to prevent array recreation
    const visiblePosts = useMemo(() => blogPosts.slice(0, 3), [blogPosts]);

    return (
        <section className="py-20 md:py-32 dark:bg-gray-950">
            <div className="container" id="projects">
                <div className="mb-2 label dark:text-gray-400">{t('title')}</div>
                <div className="mb-12 text-h1 2xl:mb-25 dark:text-white">
                    {t('subtitle').split(' & ')[0]} <br />& {t('subtitle').split(' & ')[1]}
                </div>

                <div className="grid grid-cols-3 max-md:grid-cols-1 gap-8">
                    {visiblePosts.map((article, index) => (
                        <ProjectCard
                            key={article.slug}
                            article={article}
                            blogPath={blogPath}
                            locale={locale}
                            index={index}
                        />
                    ))}
                </div>

                <motion.div 
                    className="flex justify-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{
                        duration: 0.5,
                        delay: 0.2,
                        ease: [0.25, 0.4, 0.25, 1],
                    }}
                >
                    <Link
                        href={blogPath}
                        className="px-8 py-4 bg-gray-900 dark:bg-green-500/20 border border-gray-900 dark:border-green-500/50 text-white dark:text-green-400 rounded-full text-body font-medium transition-colors duration-200 hover:bg-gray-700 dark:hover:bg-green-500/30 dark:hover:border-green-500"
                    >
                        {t('viewAll')}
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
