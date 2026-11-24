"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import profile from "@/data/profile.generated.json";

const XOR_KEY = 42;

function decodeEmail(codes: readonly number[]): string {
    return String.fromCharCode(...codes.map((c) => c ^ XOR_KEY));
}

type ContactEmailProps = {
    locale: Locale;
    variant: "hero" | "reveal" | "link";
    label?: string;
};

export default function ContactEmail({ locale, variant, label }: ContactEmailProps) {
    const isFr = locale === "fr";
    const [revealed, setRevealed] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const openMailClient = () => {
        const address = decodeEmail(profile.identity.emailCodes);
        window.location.href = `mailto:${address}`;
    };

    const handleReveal = () => {
        setRevealed(decodeEmail(profile.identity.emailCodes));
    };

    const handleCopy = async () => {
        const address = revealed ?? decodeEmail(profile.identity.emailCodes);
        try {
            await navigator.clipboard.writeText(address);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
        } catch {
            window.location.href = `mailto:${address}`;
        }
    };

    if (variant === "hero") {
        return (
            <button
                type="button"
                onClick={openMailClient}
                className="inline-flex h-10 items-center gap-1.5 border border-white/30 bg-[#080b12]/50 px-4 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/10 focus-visible:ring-offset-[#080b12]"
            >
                <Mail className="h-3.5 w-3.5 text-neutral-300" aria-hidden="true" />
                <span>{label || (isFr ? "Courriel" : "Email")}</span>
            </button>
        );
    }

    if (variant === "link") {
        return (
            <button
                type="button"
                onClick={openMailClient}
                className="inline-flex min-h-[28px] items-center gap-1 py-0.5 text-muted-foreground transition-colors hover:text-foreground"
            >
                <span>{label || (isFr ? "Courriel" : "Email")}</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
        );
    }

    if (!revealed) {
        return (
            <button
                type="button"
                onClick={handleReveal}
                className="mt-1 inline-flex min-h-[28px] items-center gap-1.5 py-1 font-mono text-xs text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
            >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{isFr ? "Afficher le courriel" : "Reveal email"}</span>
            </button>
        );
    }

    return (
        <div className="mt-1 flex flex-wrap items-center gap-2">
            <a
                href={`mailto:${revealed}`}
                className="inline-flex min-h-[28px] items-center py-1 font-mono text-xs text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent"
            >
                {revealed}
            </a>
            <button
                type="button"
                onClick={handleCopy}
                aria-label={isFr ? "Copier le courriel" : "Copy email address"}
                className="inline-flex min-h-[28px] items-center gap-1 border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
            >
                {copied ? (
                    <>
                        <Check className="h-3 w-3" aria-hidden="true" />
                        <span>{isFr ? "Copié" : "Copied"}</span>
                    </>
                ) : (
                    <>
                        <Copy className="h-3 w-3" aria-hidden="true" />
                        <span>{isFr ? "Copier" : "Copy"}</span>
                    </>
                )}
            </button>
            <span className="sr-only" aria-live="polite">
                {copied ? (isFr ? "Adresse courriel copiée" : "Email address copied") : ""}
            </span>
        </div>
    );
}
