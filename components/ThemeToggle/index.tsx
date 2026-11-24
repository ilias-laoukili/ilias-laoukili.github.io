"use client";

import { useTheme } from "@/components/ThemeProvider";
import { useLocale } from "@/lib/i18n/client";
import { Sun, Moon } from "lucide-react";

type ThemeToggleProps = {
    className?: string;
};

const ThemeToggle = ({ className }: ThemeToggleProps) => {
    const { theme, toggleTheme } = useTheme();
    const locale = useLocale();
    const isFr = locale === "fr";

    const label =
        theme === "dark"
            ? isFr
                ? "Passer au mode clair"
                : "Switch to light mode"
            : isFr
              ? "Passer au mode sombre"
              : "Switch to dark mode";

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className={`inline-flex h-9 w-9 items-center justify-center border border-border bg-background text-muted-foreground transition-colors hover:border-foreground hover:text-foreground ${className || ""}`}
            aria-label={label}
            title={label}
        >
            {theme === "dark" ? (
                <Sun className="h-4 w-4" aria-hidden="true" />
            ) : (
                <Moon className="h-4 w-4" aria-hidden="true" />
            )}
        </button>
    );
};

export default ThemeToggle;
