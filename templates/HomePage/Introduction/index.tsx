"use client";

import Button from "@/components/Button";
import { useTranslations } from "@/lib/i18n/client";

const Introduction = () => {
    const { t } = useTranslations('home');

    return (
        <div className="pt150 pb-19 bg-[#FAFAFA] dark:bg-gray-900 md:pb-0 md:bg-transparent md:dark:bg-transparent">
            <div className="container" id="about">
                <div className="flex xl:mb-25 lg:block">
                    <div className="label shrink-0 w-[27.19rem] 2xl:w-[18rem] lg:w-full lg:mb-16 dark:text-gray-400">
                        {t('introduction.sectionTitle')}
                    </div>
                    <div className="grow">
                        <p className="mb-8 text-h1 dark:text-white">
                            {t('introduction.content')}
                        </p>
                        <Button
                            title={t('introduction.seeProjects')}
                            arrow
                            href="#projects"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Introduction;
