"use client";

import Layout from "@/components/Layout";
import Image from "@/components/Image";
import Button from "@/components/Button";
import { useTranslations } from "@/lib/i18n/client";

const NotFoundPage = () => {
    const { t } = useTranslations('notFound');

    return (
        <Layout>
            <div className="pt-22 text-center">
                <div className="container">
                    <div>
                        <div className="max-w-[35rem] mx-auto mb-4 text-h2">
                            {t('title')}
                        </div>
                        <div className="max-w-[29rem] mx-auto mb-8 text-g-100">
                            {t('description')}
                        </div>
                        <Button title={t('backHome')} href="/" />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default NotFoundPage;
