"use client";

import { useTheme } from "@/components/ThemeProvider";
import { Sun, Moon } from "lucide-react";

type ThemeToggleProps = {
    className?: string;
};

const ThemeToggle = ({ className }: ThemeToggleProps) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 ${
                theme === "dark"
                    ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } ${className || ""}`}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
            <span className="sr-only">
                {theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            </span>
            {theme === "dark" ? (
                <Sun className="w-5 h-5 transition-transform duration-300" />
            ) : (
                <Moon className="w-5 h-5 transition-transform duration-300" />
            )}
        </button>
    );
};

export default ThemeToggle;
