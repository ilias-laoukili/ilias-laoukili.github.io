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
};

export type BlogCategory = {
    id: string;
    title: string;
};

export type Stat = {
    value: string;
    label: string;
};

export type HomeSettings = {
    description: string;
    role: string;
    title: string;
    introduction: string;
    stats: Stat[];
    cvPath?: string;
};

export type SkillGroup = {
    _id: string;
    category: string;
    items: string[];
};

export type ResearchInterest = {
    _id: string;
    icon: string;
    description: string;
    title: string;
};