"use client";

import { useEffect } from "react";

export default function Error({
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
            <h1 className="text-h1 text-g-500 dark:text-white">Something went wrong</h1>
            <p className="text-body text-g-100 dark:text-gray-400">
                An unexpected error occurred. Please try again.
            </p>
            <button
                onClick={reset}
                className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full text-body font-medium transition-colors hover:bg-gray-700 dark:hover:bg-gray-200"
            >
                Try again
            </button>
        </div>
    );
}
