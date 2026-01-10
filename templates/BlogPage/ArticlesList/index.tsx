import { useMemo } from "react";
import Link from "next/link";
import Image from "@/components/Image";
import { useTranslations } from "@/lib/i18n/client";
import type { BlogPost, BlogCategory } from "@/types/index";
import type { Locale } from "@/lib/i18n";

type ArticlesListProps = {
    blogPosts: BlogPost[];
    selectedCategory: string;
    searchQuery: string;
    categories: BlogCategory[];
    locale: Locale;
};

const ArticlesList = ({ blogPosts, selectedCategory, searchQuery, categories, locale }: ArticlesListProps) => {
    const { t } = useTranslations('blog');
    const { t: ct } = useTranslations('common');

    const blogPath = locale === 'en' ? '/blog' : `/${locale}/blog`;

    const filteredPosts = useMemo(() => {
        const selectedCategoryTitle = categories.find(c => c.id === selectedCategory)?.title;

        return blogPosts.filter((post) => {
            const categoryMatch = selectedCategory === "all" || post.category === selectedCategoryTitle;
            const searchMatch = !searchQuery || post.title.toLowerCase().includes(searchQuery.toLowerCase());
            return categoryMatch && searchMatch;
        });
    }, [blogPosts, selectedCategory, searchQuery, categories]);

    if (filteredPosts.length === 0) {
        return (
            <div className="py-20 text-center dark:bg-gray-950">
                <h3 className="text-h3 text-g-500 dark:text-white">{t('noArticles')}</h3>
                <p className="text-body text-g-100 dark:text-gray-400 mt-2">{t('tryAdjusting')}</p>
            </div>
        );
    }

    return (
        <div className="py-20 dark:bg-gray-950">
            <div className="container">
                <div className="grid grid-cols-3 max-md:grid-cols-1 gap-8">
                    {filteredPosts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`${blogPath}/${post.slug}`}
                            className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all flex flex-col w-full h-full"
                        >
                            <div className="relative h-48 overflow-hidden bg-g-50 dark:bg-gray-700">
                                <Image
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    src={post.mainImage || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"}
                                    width={400}
                                    height={200}
                                    alt={`Cover image for ${post.title}`}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                                    loading="lazy"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-semibold text-g-900 dark:text-white mb-3 transition-colors line-clamp-2">{post.title}</h3>
                                <p className="text-body text-g-500 dark:text-gray-400 mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
                                <div className="mt-auto pt-4 border-t border-g-50 dark:border-gray-700 text-sm text-blue-500 font-medium">{ct('readMore')}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ArticlesList;