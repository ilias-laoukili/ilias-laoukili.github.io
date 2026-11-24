import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
    weight: ["400", "500", "600"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

const interTight = Inter_Tight({
    weight: ["500", "600"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter-tight",
});

const jetbrainsMono = JetBrains_Mono({
    weight: ["400", "500"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-jetbrains-mono",
});

const SITE_URL = "https://ilias.laoukili.com";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#09090b" },
    ],
};

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: "Ilias Laoukili — AI, Cybersecurity & ML Systems",
        template: "%s | Ilias Laoukili",
    },
    description:
        "Ilias Laoukili — AI Advisor at Ministère de la Cybersécurité et du Numérique (MCN), M.Sc. Computer Science & AI researcher at Université Laval, and ESIEE Paris engineering student.",
    keywords: [
        "Ilias Laoukili",
        "AI Advisor",
        "Cybersecurity",
        "Machine Learning",
        "ML Systems",
        "Graph Neural Networks",
        "RAG",
        "Rust",
        "PyTorch",
        "Université Laval",
        "ESIEE Paris",
        "Québec",
    ],
    authors: [{ name: "Ilias Laoukili", url: SITE_URL }],
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
        title: "Ilias Laoukili — AI, Cybersecurity & ML Systems",
        description:
            "AI Advisor @ MCN · M.Sc. Computer Science & AI @ Université Laval · ESIEE Paris. Building GNN, RAG, and Rust/Python ML systems.",
        siteName: "Ilias Laoukili",
        type: "website",
        locale: "en_US",
        url: SITE_URL,
        images: [
            {
                url: "/images/og-image.png",
                width: 1200,
                height: 630,
                alt: "Ilias Laoukili — AI, Cybersecurity & ML Systems",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Ilias Laoukili — AI, Cybersecurity & ML Systems",
        description:
            "AI Advisor @ MCN · M.Sc. Computer Science & AI @ Université Laval · ESIEE Paris.",
        images: ["/images/og-image.png"],
    },
    alternates: {
        canonical: SITE_URL,
        languages: {
            en: `${SITE_URL}/en`,
            fr: `${SITE_URL}/fr`,
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={`${inter.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
        >
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    if (window.location.pathname.indexOf('/fr') === 0) {
                                        document.documentElement.lang = 'fr';
                                    }
                                    var theme = localStorage.getItem('theme');
                                    if (theme === 'dark') {
                                        document.documentElement.classList.add('dark');
                                    }
                                } catch (e) {}
                            })();
                        `,
                    }}
                />
            </head>
            <body className="bg-background font-sans text-foreground">
                <ThemeProvider defaultTheme="light">
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
