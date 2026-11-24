import { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "@/components/Image";
import { useTranslations } from "@/lib/i18n/client";
import type { BlogPost, BlogCategory } from "@/types";
import type { Locale } from "@/lib/i18n";

type ArticlesListProps = {
    blogPosts: BlogPost[];
    selectedCategory: string;
    searchQuery: string;
    categories: BlogCategory[];
    locale: Locale;
};

const ArticlesList = ({
    blogPosts,
    selectedCategory,
    searchQuery,
    categories,
    locale,
}: ArticlesListProps) => {
    const { t } = useTranslations("blog");
    const { t: ct } = useTranslations("common");
    const blogPath = `/${locale}/blog`;
    const newTabText = locale === "fr" ? " (ouvre dans un nouvel onglet)" : " (opens in a new tab)";

    const filteredPosts = useMemo(() => {
        const selectedCategoryTitle = categories.find((c) => c.id === selectedCategory)?.title;
        const q = searchQuery.trim().toLowerCase();
        return blogPosts.filter((post) => {
            const categoryMatch =
                selectedCategory === "all" || post.category === selectedCategoryTitle;
            const searchMatch =
                !q ||
                post.title.toLowerCase().includes(q) ||
                (post.excerpt ?? "").toLowerCase().includes(q) ||
                (post.tags ?? []).some((tag) => tag.toLowerCase().includes(q));
            return categoryMatch && searchMatch;
        });
    }, [blogPosts, selectedCategory, searchQuery, categories]);

    if (filteredPosts.length === 0) {
        return (
            <div className="site-container py-20 text-center">
                <h2 className="font-display text-lg font-medium text-foreground">
                    {t("noArticles")}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">{t("tryAdjusting")}</p>
            </div>
        );
    }

    return (
        <section className="bg-background">
            <div className="site-container py-12">
                <div className="divide-y divide-border border-y border-border">
                    {filteredPosts.map((post, idx) => (
                        <article
                            key={post.slug}
                            className="group grid grid-cols-1 gap-6 py-8 md:grid-cols-[15rem_1fr] md:items-start md:gap-8"
                        >
                            {post.mainImage && (
                                <Link
                                    href={`${blogPath}/${post.slug}/`}
                                    tabIndex={-1}
                                    aria-hidden="true"
                                    className="relative block aspect-[16/9] w-full overflow-hidden border border-border bg-[#0d1017]"
                                >
                                    <Image
                                        src={post.mainImage}
                                        alt={post.imageAlt || post.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 240px"
                                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                    />
                                    <span className="absolute left-2.5 top-2.5 border border-white/20 bg-[#080b12]/80 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-200 backdrop-blur-sm">
                                        {`FIG. 0${idx + 1}`}
                                    </span>
                                </Link>
                            )}

                            <div>
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
                                    <span>{post.publishedAt}</span>
                                    {post.category && (
                                        <>
                                            <span aria-hidden="true">·</span>
                                            <span className="uppercase tracking-wider text-foreground">
                                                {post.category}
                                            </span>
                                        </>
                                    )}
                                </div>

                                <h2 className="mt-2 font-display text-xl font-medium text-foreground">
                                    <Link
                                        href={`${blogPath}/${post.slug}/`}
                                        className="transition-colors hover:text-accent"
                                    >
                                        {post.title}
                                    </Link>
                                </h2>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    {post.excerpt}
                                </p>

                                <div className="mt-4 flex flex-wrap items-center gap-4 font-mono text-xs">
                                    <Link
                                        href={`${blogPath}/${post.slug}/`}
                                        aria-label={`${ct("readMore")}: ${post.title}`}
                                        className="inline-flex min-h-[28px] items-center gap-1 py-1 text-foreground transition-colors hover:text-accent"
                                    >
                                        <span>{ct("readMore")}</span>
                                        <ArrowRight className="h-3 w-3" aria-hidden="true" />
                                    </Link>
                                    {post.githubUrl && (
                                        <a
                                            href={post.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`${post.title} — ${ct("viewOnGithub")}${newTabText}`}
                                            className="inline-flex min-h-[28px] items-center gap-1 py-1 text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            <span>{ct("viewOnGithub")}</span>
                                            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                                        </a>
                                    )}
                                    {post.demoUrl && (
                                        <a
                                            href={post.demoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`${post.title} — ${ct("tryLiveDemo")}${newTabText}`}
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

export default ArticlesList;
