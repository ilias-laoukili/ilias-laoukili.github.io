export type BlogPost = {
    slug: string;
    title: string;
    content: string;
    mainImage?: string;
    category?: string;
    publishedAt?: string;
    tags?: string[];
    excerpt?: string;
    extraImage?: string;
    demoUrl?: string;
};

export type BlogCategory = {
    id: string;
    title: string;
};

export type Stat = {
    value: string;
    label: string;
    description?: string;
};