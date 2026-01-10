import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const interTight = Inter_Tight({
    weight: ["500"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter-tight",
    preload: true,
});

const inter = Inter({
    weight: ["400", "500", "600"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
    preload: true,
});

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#ffffff",
};

export const metadata: Metadata = {
    metadataBase: new URL("https://ilias-laoukili.github.io"),
    title: {
        default: "Ilias Laoukili - AI & Cybersecurity Engineer",
        template: "%s | Ilias Laoukili",
    },
    description: "Portfolio of Ilias Laoukili - AI & Cybersecurity Engineering Student at ESIEE Paris. Expertise in Machine Learning, Computer Vision, and secure system design.",
    keywords: [
        "Ilias Laoukili",
        "Portfolio",
        "AI Engineer",
        "Cybersecurity",
        "Machine Learning",
        "Computer Vision",
        "YOLO",
        "Python",
        "ESIEE Paris",
        "Software Engineer"
    ],
    authors: [{ name: "Ilias Laoukili", url: "https://ilias-laoukili.github.io" }],
    creator: "Ilias Laoukili",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        title: "Ilias Laoukili - AI & Cybersecurity Engineer",
        description: "Portfolio of Ilias Laoukili - AI & Cybersecurity Engineering Student at ESIEE Paris",
        siteName: "Ilias Laoukili Portfolio",
        type: "website",
        locale: "en_US",
        url: "https://ilias-laoukili.github.io",
    },
    twitter: {
        card: "summary_large_image",
        title: "Ilias Laoukili - AI & Cybersecurity Engineer",
        description: "Portfolio of Ilias Laoukili - AI & Cybersecurity Engineering Student at ESIEE Paris",
    },
    alternates: {
        canonical: "https://ilias-laoukili.github.io",
        languages: {
            "en": "https://ilias-laoukili.github.io/en",
            "fr": "https://ilias-laoukili.github.io/fr",
            "de": "https://ilias-laoukili.github.io/de",
            "es": "https://ilias-laoukili.github.io/es",
            "nl": "https://ilias-laoukili.github.io/nl",
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className={`${inter.variable} ${interTight.variable}`}>
            <head>
                {/* Preload critical fonts handled by next/font */}
                {/* Preload LCP-critical styles */}
                {/* Prevent flash of wrong theme */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    var theme = localStorage.getItem('theme');
                                    if (!theme) {
                                        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                                    }
                                    if (theme === 'dark') {
                                        document.documentElement.classList.add('dark');
                                    }
                                } catch (e) {}
                            })();
                        `,
                    }}
                />
                <style dangerouslySetInnerHTML={{ __html: `
                    /* Critical CSS for LCP - inline hero text styles */
                    .text-display { font-size: clamp(2.5rem, 8vw, 6rem); font-weight: 500; line-height: 1.1; }
                    .text-h3 { font-size: clamp(1.25rem, 3vw, 1.875rem); font-weight: 500; }
                    .text-h6 { font-size: clamp(1rem, 2vw, 1.25rem); }
                ` }} />
            </head>
            <body
                className="bg-white dark:bg-gray-950 font-sans text-paragraph font-medium text-g-500 dark:text-gray-300 antialiased md:text-body transition-colors duration-300"
            >
                <ThemeProvider>
                    <a
                        href="#main-content"
                        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:bg-gray-800 dark:focus:text-white"
                    >
                        Skip to main content
                    </a>
                    <main id="main-content">
                        {children}
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}
