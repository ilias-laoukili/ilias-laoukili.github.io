import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
    weight: ["500"],
    subsets: ["latin"],
    display: "block",
    variable: "--font-inter-tight",
});

const inter = Inter({
    weight: ["400", "500", "600"],
    subsets: ["latin"],
    display: "block",
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Ilias Laoukili - Portfolio",
    description: "Portfolio of Ilias Laoukili",
    keywords: [
        "Ilias Laoukili",
        "Portfolio",
        "AI",
        "Cybersecurity",
        "Engineering",
        "Student",
        "Web Developer",
        "Machine Learning",
        "Next.js",
        "TailwindCSS"
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <meta
                    name="description"
                    content="Portfolio of Ilias Laoukili - AI & Cybersecurity Engineering Student"
                />

                <meta
                    name="product-name"
                    content="Portfolio of Ilias Laoukili - AI & Cybersecurity Engineering Student"
                />

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content="@ui8" />
                <meta
                    name="twitter:title"
                    content="Portfolio of Ilias Laoukili - AI & Cybersecurity Engineering Student"
                />
                <meta
                    name="twitter:description"
                    content="Portfolio of Ilias Laoukili - AI & Cybersecurity Engineering Student"
                />
                <meta name="twitter:creator" content="@ui8" />

                <meta
                    property="og:title"
                    content="Portfolio of Ilias Laoukili - AI & Cybersecurity Engineering Student"
                />
                <meta property="og:type" content="Article" />
                <meta
                    property="og:description"
                    content="Ilias Laoukili - Portfolio"
                />
                <meta
                    property="og:site_name"
                    content="Ilias Laoukili - Portfolio"
                />

                {/* Removed duplicate OG tags */}
            </head>
            <body
                className={`${inter.variable} ${interTight.variable} bg-white font-sans text-paragraph font-medium text-g-500 antialiased md:text-body`}
            >
                {children}
            </body>
        </html>
    );
}
