"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Hero from "./Hero";
import ArticlesList from "./ArticlesList";
import FloatingNav from "@/components/FloatingNav";
import type { BlogPost, BlogCategory } from "@/types/index";
import type { Locale } from "@/lib/i18n";

type BlogPageProps = {
    blogPosts: BlogPost[];
    categories: BlogCategory[];
    locale: Locale;
};

const BlogPage = ({ blogPosts, categories, locale }: BlogPageProps) => {
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState<string>("");

    return (
        <Layout locale={locale}>
            <FloatingNav locale={locale} />
            <Hero
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                categories={categories}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />

            <ArticlesList 
                selectedCategory={selectedCategory} 
                blogPosts={blogPosts}
                searchQuery={searchQuery}
                categories={categories}
                locale={locale}
            />
        </Layout>
    );
};

export default BlogPage;