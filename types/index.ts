export type LocalizedString = {
    en: string;
    fr: string;
};

export type Project = {
    title: LocalizedString;
    slug: string;
    date: string;
    category: LocalizedString;
    tags: string[];
    excerpt: LocalizedString;
    imageUrl: string;
    imageAlt: LocalizedString;
    imageCaption?: LocalizedString;
    coverVideo?: string;
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
    imageAlt?: string;
    imageCaption?: string;
    coverVideo?: string;
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
