"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "@/components/Image";
import { useTranslations } from "@/lib/i18n/client";
import type { BlogPost } from "@/types";
import type { Locale } from "@/lib/i18n";

type ProjectsProps = {
    blogPosts: BlogPost[];
    locale: Locale;
};

const Projects = ({ blogPosts, locale }: ProjectsProps) => {
    const { t } = useTranslations("home.projects");
    const { t: ct } = useTranslations("common");
    const blogPath = `/${locale}/blog`;
    const visiblePosts = blogPosts.slice(0, 3);

    const newTabText = locale === "fr" ? " (ouvre dans un nouvel onglet)" : " (opens in a new tab)";

    return (
        <section id="projects" className="border-b border-border bg-muted/30">
            <div className="site-container py-20">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <div className="section-index">{t("index")}</div>
                        <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                            {t("title")}
                        </h2>
                    </div>
                    <Link
                        href={`${blogPath}/`}
                        className="inline-flex min-h-[28px] items-center gap-1.5 py-1 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <span>{t("viewAll")}</span>
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                </div>

                <div className="mt-10 grid grid-cols-1 border-l border-t border-border md:grid-cols-3">
                    {visiblePosts.map((article, idx) => (
                        <article
                            key={article.slug}
                            className="group flex flex-col border-b border-r border-border bg-background transition-colors hover:bg-muted/40"
                        >
                            {article.mainImage && (
                                <Link
                                    href={`${blogPath}/${article.slug}/`}
                                    tabIndex={-1}
                                    aria-hidden="true"
                                    className="relative block aspect-[16/9] w-full overflow-hidden border-b border-border bg-[#0d1017]"
                                >
                                    <Image
                                        src={article.mainImage}
                                        alt={article.imageAlt || article.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                    />
                                    <span className="absolute left-3 top-3 border border-white/20 bg-[#080b12]/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-200 backdrop-blur-sm">
                                        {`FIG. 0${idx + 1}`}
                                    </span>
                                </Link>
                            )}

                            <div className="flex flex-grow flex-col p-6">
                                <div className="flex items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                                    <span>{`0${idx + 1} · ${article.category || ""}`}</span>
                                    {article.publishedAt && <span>{article.publishedAt.slice(0, 7)}</span>}
                                </div>

                                <h3 className="mt-4 font-display text-lg font-medium leading-snug text-foreground">
                                    <Link
                                        href={`${blogPath}/${article.slug}/`}
                                        className="transition-colors hover:text-accent"
                                    >
                                        {article.title}
                                    </Link>
                                </h3>

                                <p className="mt-3 flex-grow text-sm leading-relaxed text-muted-foreground">
                                    {article.excerpt}
                                </p>

                                {article.tags && article.tags.length > 0 && (
                                    <div className="mt-5 flex flex-wrap gap-1.5">
                                        {article.tags.slice(0, 4).map((tag) => (
                                            <span
                                                key={tag}
                                                className="border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-4 font-mono text-xs">
                                    <Link
                                        href={`${blogPath}/${article.slug}/`}
                                        aria-label={`${ct("readMore")}: ${article.title}`}
                                        className="inline-flex min-h-[28px] items-center gap-1 py-1 text-foreground transition-colors hover:text-accent"
                                    >
                                        <span>{ct("readMore")}</span>
                                        <ArrowRight className="h-3 w-3" aria-hidden="true" />
                                    </Link>

                                    {article.githubUrl && (
                                        <a
                                            href={article.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`${article.title} — ${ct("viewOnGithub")}${newTabText}`}
                                            className="inline-flex min-h-[28px] items-center gap-1 py-1 text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            <span>{ct("viewOnGithub")}</span>
                                            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                                        </a>
                                    )}

                                    {article.demoUrl && (
                                        <a
                                            href={article.demoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`${article.title} — ${ct("tryLiveDemo")}${newTabText}`}
                                            className="inline-flex min-h-[28px] items-center gap-1 py-1 text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            <span>{ct("tryLiveDemo")}</span>
                                            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
