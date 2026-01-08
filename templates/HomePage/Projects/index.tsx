"use client";

import Image from "@/components/Image";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef } from "react";
import { useTranslations } from "@/lib/i18n/client";
import type { BlogPost } from "@/types/index";
import type { Locale } from "@/lib/i18n";

type ProjectsProps = {
    blogPosts: BlogPost[];
    locale: Locale;
};

const Projects = ({ blogPosts, locale }: ProjectsProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const { t } = useTranslations('home.projects');

    const blogPath = locale === 'en' ? '/blog' : `/${locale}/blog`;

    return (
        <div className="py-20 md:py-32">
            <div className="container" id="projects">
                <div className="mb-2 label">{t('title')}</div>
                <div className="mb-12 text-h1 2xl:mb-25">
                    {t('subtitle').split(' & ')[0]} <br />& {t('subtitle').split(' & ')[1]}
                </div>

                <div ref={ref}>
                    <div className="grid grid-cols-3 max-md:grid-cols-1 gap-8">
                    {blogPosts.slice(0, 3).map((article, index) => (
                        <motion.div
                            key={article.slug}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.2,
                                ease: [0.25, 0.4, 0.25, 1],
                            }}
                            className="w-full h-full"
                        >
                            <Link
                                href={`${blogPath}/${article.slug}`}
                                className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all flex flex-col w-full h-full"
                            >
                                <div className="relative h-48 overflow-hidden bg-g-50">
                                    <Image
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        src={article.mainImage || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"}
                                        width={400}
                                        height={200}
                                        alt={`Cover image for ${article.title}`}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-3 mb-3 text-caption text-g-100 h-6">
                                    <AnimatePresence>
                                        {article.category && (
                                            <motion.span 
                                                className="px-3 py-0.5 border rounded-lg text-white font-medium text-[12px]"
                                                style={{ 
                                                    backgroundColor: '#3b82f633',
                                                    borderColor: '#3b82f6',
                                                    color: '#3b82f6' 
                                                }}
                                            >
                                                {article.category}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                    <span>
                                        {new Date(article.publishedAt || Date.now()).toLocaleDateString(locale === 'en' ? 'en-US' : locale, {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </span>
                                </div>

                                <h3 className="text-xl font-semibold text-g-900 mb-3 transition-colors line-clamp-2 group-hover:text-blue-500">
                                    {article.title}
                                </h3>

                                <p className="text-body text-g-500 mb-4 line-clamp-3 flex-grow">
                                    {article.excerpt}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {article.tags?.slice(0, 3).map((tag: string, index: number) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-g-50 rounded-full text-caption text-g-300"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                    </Link>
                        </motion.div>
                    ))}
                    </div>
                </div>

                <motion.div 
                    className="flex justify-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{
                        duration: 0.6,
                        delay: 0.8,
                        ease: [0.25, 0.4, 0.25, 1],
                    }}
                >
                    <Link
                        href={blogPath}
                        className="px-8 py-4 bg-g-500 text-white rounded-full text-body font-medium hover:bg-g-400 transition-colors"
                    >
                        {t('viewAll')}
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default Projects;
