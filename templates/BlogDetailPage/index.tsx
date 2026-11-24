"use client";

import Layout from "@/components/Layout";
import Image from "@/components/Image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useTranslations } from "@/lib/i18n/client";
import type { BlogPost } from "@/types";
import type { Locale } from "@/lib/i18n";

type BlogDetailPageProps = {
    article: BlogPost;
    similarArticles?: BlogPost[];
    locale: Locale;
};

const isVideoSource = (src?: string) => Boolean(src && /\.(mp4|webm|ogg)(\?.*)?$/i.test(src));

const BlogDetailPage = ({ article, similarArticles = [], locale }: BlogDetailPageProps) => {
    const { t } = useTranslations("blog");
    const { t: ct } = useTranslations("common");
    const blogPath = `/${locale}/blog`;
    const newTabLabel = locale === "fr" ? "ouvre dans un nouvel onglet" : "opens in a new tab";

    return (
        <Layout locale={locale}>
            <article className="bg-background">
                <header className="border-b border-border">
                    <div className="site-container max-w-3xl py-16">
                        <Link
                            href={`${blogPath}/`}
                            className="inline-flex min-h-[28px] items-center gap-1.5 py-1 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>{t("backToArticles")}</span>
                        </Link>

                        <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                            {article.category && (
                                <span className="border border-border px-2 py-0.5 text-foreground">
                                    {article.category}
                                </span>
                            )}
                            {article.publishedAt && <span>{article.publishedAt}</span>}
                        </div>

                        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                            {article.title}
                        </h1>

                        {article.tags && article.tags.length > 0 && (
                            <div className="mt-5 flex flex-wrap gap-1.5">
                                {article.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {(article.githubUrl || article.demoUrl) && (
                            <div className="mt-7 flex flex-wrap gap-3">
                                {article.githubUrl && (
                                    <a
                                        href={article.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex h-9 items-center gap-1.5 bg-foreground px-4 font-mono text-xs text-background transition-opacity hover:opacity-85"
                                    >
                                        <span>{ct("viewOnGithub")}</span>
                                        <span className="sr-only"> ({newTabLabel})</span>
                                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                                    </a>
                                )}
                                {article.demoUrl && (
                                    <a
                                        href={article.demoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex h-9 items-center gap-1.5 border border-border px-4 font-mono text-xs text-foreground transition-colors hover:border-foreground"
                                    >
                                        <span>{ct("tryLiveDemo")}</span>
                                        <span className="sr-only"> ({newTabLabel})</span>
                                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </header>

                {(article.coverVideo || article.mainImage) && (
                    <div className="border-b border-border bg-muted/20">
                        <div className="site-container max-w-3xl py-10">
                            <figure className="overflow-hidden border border-border bg-[#0d1017]">
                                {article.coverVideo ? (
                                    <video
                                        controls
                                        playsInline
                                        preload="metadata"
                                        poster={article.mainImage}
                                        aria-label={article.imageAlt || article.title}
                                        className="aspect-[16/9] w-full bg-[#0d1017] object-cover"
                                    >
                                        <source src={article.coverVideo} />
                                    </video>
                                ) : (
                                    article.mainImage && (
                                        <div className="relative aspect-[16/9] w-full">
                                            <Image
                                                src={article.mainImage}
                                                alt={article.imageAlt || article.title}
                                                fill
                                                priority
                                                sizes="(max-width: 768px) 100vw, 768px"
                                                className="object-cover"
                                            />
                                        </div>
                                    )
                                )}
                                {article.imageCaption && (
                                    <figcaption className="border-t border-border bg-background px-4 py-2.5 font-mono text-xs text-muted-foreground">
                                        {article.imageCaption}
                                    </figcaption>
                                )}
                            </figure>
                        </div>
                    </div>
                )}

                <div className="site-container max-w-3xl py-14">
                    <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-display prose-headings:tracking-tight prose-a:text-accent prose-code:font-mono prose-pre:border prose-pre:border-border prose-pre:bg-muted">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                th: ({ children, ...props }) => (
                                    <th scope="col" {...props}>
                                        {children}
                                    </th>
                                ),
                                img: ({ src, alt, title }) => {
                                    if (!src) return null;
                                    if (isVideoSource(src)) {
                                        return (
                                            <figure className="not-prose my-8 overflow-hidden border border-border bg-[#0d1017]">
                                                <video
                                                    controls
                                                    playsInline
                                                    preload="metadata"
                                                    aria-label={alt || title || article.title}
                                                    className="w-full"
                                                >
                                                    <source src={src} />
                                                </video>
                                                {(title || alt) && (
                                                    <figcaption className="border-t border-border bg-background px-4 py-2 font-mono text-xs text-muted-foreground">
                                                        {title || alt}
                                                    </figcaption>
                                                )}
                                            </figure>
                                        );
                                    }
                                    return (
                                        <figure className="not-prose my-8 overflow-hidden border border-border bg-muted/20">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={src}
                                                alt={alt || ""}
                                                loading="lazy"
                                                className="w-full object-cover"
                                            />
                                            {(title || alt) && (
                                                <figcaption className="border-t border-border bg-background px-4 py-2 font-mono text-xs text-muted-foreground">
                                                    {title || alt}
                                                </figcaption>
                                            )}
                                        </figure>
                                    );
                                },
                            }}
                        >
                            {article.content || ""}
                        </ReactMarkdown>
                    </div>
                </div>
            </article>

            {similarArticles.length > 0 && (
                <section className="border-t border-border bg-muted/30">
                    <div className="site-container max-w-3xl py-14">
                        <h2 className="section-index mb-6">{t("similarArticles")}</h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {similarArticles.map((item) => (
                                <Link
                                    key={item.slug}
                                    href={`${blogPath}/${item.slug}/`}
                                    className="group overflow-hidden border border-border bg-background transition-colors hover:border-foreground"
                                >
                                    {item.mainImage && (
                                        <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border bg-[#0d1017]">
                                            <Image
                                                src={item.mainImage}
                                                alt=""
                                                aria-hidden="true"
                                                fill
                                                sizes="(max-width: 640px) 100vw, 360px"
                                                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                            />
                                        </div>
                                    )}
                                    <div className="p-5">
                                        <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                                            {item.category}
                                        </div>
                                        <h3 className="mt-2 font-display text-base font-medium text-foreground group-hover:text-accent">
                                            {item.title}
                                        </h3>
                                        <div className="mt-3 inline-flex items-center gap-1 font-mono text-xs text-muted-foreground group-hover:text-foreground">
                                            <span>{ct("readMore")}</span>
                                            <ArrowRight className="h-3 w-3" aria-hidden="true" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </Layout>
    );
};

export default BlogDetailPage;
