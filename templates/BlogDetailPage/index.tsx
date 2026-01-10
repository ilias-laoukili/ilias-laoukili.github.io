"use client";

import Layout from "@/components/Layout";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "@/components/Image";
import Link from "next/link";
import { useTranslations } from "@/lib/i18n/client";
import type { BlogPost } from "@/types/index";
import type { Locale } from "@/lib/i18n";

type BlogDetailPageProps = {
    article: BlogPost;
    similarArticles?: BlogPost[];
    locale: Locale;
};

const BlogDetailPage = ({ article, similarArticles = [], locale }: BlogDetailPageProps) => {
    const { t } = useTranslations('blog');
    const { t: ct } = useTranslations('common');

    const blogPath = locale === 'en' ? '/blog' : `/${locale}/blog`;

    return (
        <Layout classHeader="!absolute top-0 left-0 right-0 z-5" lightHeader locale={locale}>
            <div className="relative w-full h-[300px] bg-g-900 dark:bg-gray-950">
                <Image
                    className="w-full h-full object-cover opacity-40"
                    src={article.mainImage || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1920&q=80"}
                    width={1920}
                    height={500}
                    alt={article.title}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="container">
                        <div className="max-w-4xl mx-auto text-center">
                            {article.category && (
                                <div
                                    className="inline-block px-4 py-1 mb-6 backdrop-blur-xl rounded-lg text-body font-medium"
                                    style={{
                                        backgroundColor: "#3b82f633",
                                        borderColor: "#3b82f6",
                                        color: "#3b82f6",
                                    }}
                                >
                                    {article.category}
                                </div>
                            )}
                            
                            <h1 className="mb-6 text-h1 text-g-900 dark:text-white">
                                {article.title}
                            </h1>
                            
                            <div className="flex items-center justify-center gap-4 text-body text-g-500 dark:text-gray-400">
                                {article.publishedAt && <span>
                                    {new Date(article.publishedAt).toLocaleDateString(locale === 'en' ? 'en-US' : locale,
                                        {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        }
                                    )}
                                </span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-20 dark:bg-gray-950">
                <div className="container">
                    <div className="max-w-4xl mx-auto">
                        {article.tags && <div className="flex flex-wrap gap-3 mb-12">
                            {article.tags?.map((tag: string, index: number) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-white dark:bg-gray-800 border border-g-100 dark:border-gray-700 rounded-full text-body text-g-300 dark:text-gray-400 hover:border-g-300 dark:hover:border-gray-500 transition-colors"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>}

                        {article.demoUrl && (
                            <div className="mb-12">
                                <a
                                    href={article.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-full text-body font-medium hover:bg-blue-600 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Try Live Demo
                                </a>
                            </div>
                        )}

                        <div className="prose prose-lg dark:prose-invert max-w-none font-sans text-g-500 dark:text-gray-300">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content || ""}</ReactMarkdown>
                            {article.extraImage && (
                                <div className="my-12 flex justify-center">
                                    <Image
                                        src={article.extraImage}
                                        alt={article.title + " research image"}
                                        width={600}
                                        height={400}
                                        className="rounded-lg border border-g-100 dark:border-gray-700 shadow-md"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="mt-16 pt-8 border-t border-g-50 dark:border-gray-700">
                            <Link
                                href={blogPath}
                                className="inline-flex items-center gap-2 text-body text-blue-500 hover:text-blue-600 transition-colors"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                    />
                                </svg>
                                {t('backToArticles')}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {similarArticles && similarArticles.length > 0 && (
                <div className="py-20 bg-g-50 dark:bg-gray-900">
                    <div className="container">
                        <div className="max-w-6xl mx-auto">
                            <h2 className="text-h2 mb-12 text-center dark:text-white">
                                {t('similarArticles')}
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {similarArticles.map((similarArticle) => (
                                    <Link
                                        key={similarArticle.slug}
                                        href={`${blogPath}/${similarArticle.slug}`}
                                        className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all"
                                    >
                                        <div className="relative h-48 overflow-hidden bg-g-50 dark:bg-gray-700">
                                            <Image
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                src={similarArticle.mainImage || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"}
                                                width={400}
                                                height={200}
                                                alt={similarArticle.title}
                                            />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold text-g-900 dark:text-white mb-3 transition-colors line-clamp-2">
                                                {similarArticle.title}
                                            </h3>
                                            <p className="text-body text-g-500 dark:text-gray-400 mb-4 line-clamp-2">
                                                {similarArticle.excerpt}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default BlogDetailPage;
