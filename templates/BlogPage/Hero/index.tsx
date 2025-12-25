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
}: HeroProps) => (
    <div className="py-19 bg-[#FAFAFA]">
        <div className="container">
            <div className="mb-16">
                <div className="label mb-8">Blog</div>
                <h1 className="text-display text-g-500 mb-6">
                    Research & Articles
                </h1>
                <p className="text-h5 text-g-100 max-w-3xl">
                    Scientific publications, technical analyses and reflections
                    on AI and cybersecurity
                </p>
            </div>

            <div className="mb-4">
                <div className="relative max-w-2xl">
                    <input
                        type="text"
                        placeholder="Search for an article by title..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full px-6 py-4 pr-12 rounded-full border border-g-100 bg-white text-body text-g-500 placeholder:text-g-100 focus:outline-none focus:border-g-300 focus:ring-2 focus:ring-g-100 transition-all"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-g-100">
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
                            ? "bg-g-500 text-white"
                            : "bg-white text-g-500 hover:bg-g-50"
                    }`}
                >
                    All articles
                </button>

                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => onCategoryChange(category.id)}
                        className={`px-6 py-3 rounded-full text-body font-medium transition-all ${
                            selectedCategory === category.id
                                ? "bg-g-500 text-white"
                                : "bg-white text-g-500 hover:bg-g-50"
                        }`}
                    >
                        {category.title}
                    </button>
                ))}
            </div>
        </div>
    </div>
);

export default Hero;