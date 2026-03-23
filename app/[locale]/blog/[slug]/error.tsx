"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function BlogPostError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4">
            <h1 className="text-h1 text-g-500 dark:text-white">Failed to load article</h1>
            <p className="text-body text-g-100 dark:text-gray-400">
                This article could not be loaded. It may have been moved or deleted.
            </p>
            <div className="flex gap-4">
                <button
                    onClick={reset}
                    className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full text-body font-medium transition-colors hover:bg-gray-700 dark:hover:bg-gray-200"
                >
                    Try again
                </button>
                <Link
                    href="/blog"
                    className="px-6 py-3 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-full text-body font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                    Back to blog
                </Link>
            </div>
        </div>
    );
}
