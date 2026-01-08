import { notFound } from 'next/navigation';
import { locales, isValidLocale, type Locale } from '@/lib/i18n';
import { TranslationProvider } from '@/lib/i18n/client';
import { getMessages } from '@/lib/i18n/server';

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

type LocaleLayoutProps = {
    children: React.ReactNode;
    params: { locale: string };
};

export default function LocaleLayout({
    children,
    params: { locale }
}: LocaleLayoutProps) {
    // Validate that the incoming `locale` parameter is valid
    if (!isValidLocale(locale)) {
        notFound();
    }

    const messages = getMessages(locale as Locale);

    return (
        <TranslationProvider messages={messages} locale={locale as Locale}>
            {children}
        </TranslationProvider>
    );
}
