"use client";

import Link from "next/link";
import Layout from "@/components/Layout";
import { useTranslations, useLocale } from "@/lib/i18n/client";

const NotFoundPage = () => {
    const { t } = useTranslations("notFound");
    const locale = useLocale();

    return (
        <Layout locale={locale}>
            <div className="site-container py-28">
                <div className="section-index">ERROR / 404</div>
                <h1 className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-4xl">
                    {t("title")}
                </h1>
                <p className="mt-3 max-w-md text-base text-muted-foreground">
                    {t("description")}
                </p>
                <Link
                    href={`/${locale}`}
                    className="mt-8 inline-flex h-10 items-center border border-foreground bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-85"
                >
                    {t("backHome")}
                </Link>
            </div>
        </Layout>
    );
};

export default NotFoundPage;
