export type Project = {
    title: string;
    slug: string;
    date: string;
    category: string;
    tags: string[];
    excerpt: string;
    imageUrl: string;
    pdfUrl?: string;
    demoUrl?: string;
    extraImage?: string;
    githubUrl?: string;
};

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
    githubUrl?: string;
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