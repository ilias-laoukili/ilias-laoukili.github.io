import { Search } from "lucide-react";
import { useTranslations } from "@/lib/i18n/client";
import type { BlogCategory } from "@/types";

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
    onSearchChange,
}: HeroProps) => {
    const { t } = useTranslations("blog");

    return (
        <section className="border-b border-border bg-background">
            <div className="site-container py-16">
                <div className="section-index">{t("index")}</div>
                <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                    {t("heroTitle")}
                </h1>
                <p className="mt-3 max-w-2xl text-base text-muted-foreground">
                    {t("subtitle")}
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative w-full max-w-md">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder={t("searchPlaceholder")}
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="h-10 w-full border border-border bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={() => onCategoryChange("all")}
                            className={`border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                                selectedCategory === "all"
                                    ? "border-foreground bg-foreground text-background"
                                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                            }`}
                        >
                            {t("allArticles")}
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                type="button"
                                onClick={() => onCategoryChange(category.id)}
                                className={`border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                                    selectedCategory === category.id
                                        ? "border-foreground bg-foreground text-background"
                                        : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                                }`}
                            >
                                {category.title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
