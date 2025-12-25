"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Hero from "./Hero";
import ArticlesList from "./ArticlesList";
import FloatingNav from "@/components/FloatingNav";
import type { BlogPost, BlogCategory } from "@/types/index";

type BlogPageProps = {
    blogPosts: BlogPost[];
    categories: BlogCategory[];
};

const BlogPage = ({ blogPosts, categories }: BlogPageProps) => {
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState<string>("");

    return (
        <Layout>
            <FloatingNav />
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
            />
        </Layout>
    );
};

export default BlogPage;