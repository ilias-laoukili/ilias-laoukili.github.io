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

function getStoredTheme(): Theme | null {
    try {
        const val = localStorage.getItem("theme");
        return val === "dark" || val === "light" ? val : null;
    } catch {
        return null;
    }
}

function storeTheme(theme: Theme) {
    try {
        localStorage.setItem("theme", theme);
    } catch {
        // localStorage unavailable
    }
}

export function ThemeProvider({
    children,
    defaultTheme = "light",
}: {
    children: ReactNode;
    defaultTheme?: Theme;
}) {
    const [theme, setThemeState] = useState<Theme>(defaultTheme);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const saved = getStoredTheme();
        const initial = saved ?? defaultTheme;
        setThemeState(initial);
        document.documentElement.classList.toggle("dark", initial === "dark");
    }, [defaultTheme]);

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

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;
