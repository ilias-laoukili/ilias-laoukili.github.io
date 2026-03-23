"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}

type ThemeProviderProps = {
    children: ReactNode;
    defaultTheme?: Theme;
};

function getStoredTheme(): Theme | null {
    try {
        return localStorage.getItem("theme") as Theme | null;
    } catch {
        return null;
    }
}

function storeTheme(theme: Theme) {
    try {
        localStorage.setItem("theme", theme);
    } catch {
        // localStorage unavailable (e.g. private browsing)
    }
}

export function ThemeProvider({ children, defaultTheme = "light" }: ThemeProviderProps) {
    const [theme, setThemeState] = useState<Theme>(defaultTheme);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedTheme = getStoredTheme();
        const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        const initialTheme = savedTheme || systemPreference;
        setThemeState(initialTheme);
        document.documentElement.classList.toggle("dark", initialTheme === "dark");

        // Listen for OS theme changes
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e: MediaQueryListEvent) => {
            if (!getStoredTheme()) {
                const newTheme = e.matches ? "dark" : "light";
                setThemeState(newTheme);
                document.documentElement.classList.toggle("dark", newTheme === "dark");
            }
        };
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    useEffect(() => {
        if (mounted) {
            document.documentElement.classList.toggle("dark", theme === "dark");
            storeTheme(theme);
        }
    }, [theme, mounted]);

    const toggleTheme = useCallback(() => {
        setThemeState((prev) => (prev === "light" ? "dark" : "light"));
    }, []);

    const setTheme = useCallback((newTheme: Theme) => {
        setThemeState(newTheme);
    }, []);

    // Prevent flash of wrong theme
    if (!mounted) {
        return (
            <ThemeContext.Provider value={{ theme: defaultTheme, toggleTheme, setTheme }}>
                {children}
            </ThemeContext.Provider>
        );
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;
