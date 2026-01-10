import { useTranslations } from "@/lib/i18n/client";
import type { BlogCategory } from "@/types/index";

type HeroProps = {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    categories: BlogCategory[];
    searchQuery: string;
    onSearchChange: (query: string) => void;
};

const Hero = ({ 
    selectedCategory, 
    onCategoryChange, 
    categories, 
    searchQuery, 
    onSearchChange 
}: HeroProps) => {
    const { t } = useTranslations('blog');

    return (
        <div className="py-19 bg-[#FAFAFA] dark:bg-gray-900">
            <div className="container">
                <div className="mb-16">
                    <div className="label mb-8 dark:text-gray-400">{t('title')}</div>
                    <h1 className="text-display text-g-500 dark:text-white mb-6">
                        {t('heroTitle')}
                    </h1>
                    <p className="text-h5 text-g-100 dark:text-gray-400 max-w-3xl">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="mb-4">
                    <div className="relative max-w-2xl">
                        <input
                            type="text"
                            placeholder={t('searchPlaceholder')}
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full px-6 py-4 pr-12 rounded-full border border-g-100 dark:border-gray-700 bg-white dark:bg-gray-800 text-body text-g-500 dark:text-white placeholder:text-g-100 dark:placeholder:text-gray-500 focus:outline-none focus:border-g-300 dark:focus:border-gray-500 focus:ring-2 focus:ring-g-100 dark:focus:ring-gray-600 transition-all"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-g-100 dark:text-gray-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 flex-wrap">
                    <button
                        onClick={() => onCategoryChange("all")}
                        className={`px-6 py-3 rounded-full text-body font-medium transition-all ${
                            selectedCategory === "all"
                                ? "bg-g-500 dark:bg-white text-white dark:text-gray-900"
                                : "bg-white dark:bg-gray-800 text-g-500 dark:text-gray-300 hover:bg-g-50 dark:hover:bg-gray-700"
                        }`}
                    >
                        {t('allArticles')}
                    </button>

                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => onCategoryChange(category.id)}
                            className={`px-6 py-3 rounded-full text-body font-medium transition-all ${
                                selectedCategory === category.id
                                    ? "bg-g-500 dark:bg-white text-white dark:text-gray-900"
                                    : "bg-white dark:bg-gray-800 text-g-500 dark:text-gray-300 hover:bg-g-50 dark:hover:bg-gray-700"
                            }`}
                        >
                            {category.title}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hero;