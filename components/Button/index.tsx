import Link from "next/link";
import Icon from "@/components/Icon";

type ButtonProps = {
    className?: string;
    title: string;
    href?: string;
    onClick?: () => void;
    arrow?: boolean;
    light?: boolean;
};

const Button = ({
    className,
    title,
    href,
    onClick,
    arrow,
    light,
}: ButtonProps) => {
    const buttonContent = (
        <>
            <span className="mr-auto">{title}</span>
            {arrow && (
                <span
                    className={`flex items-center justify-center w-8 h-8 ml-6 -mr-3 rounded-full transition-colors ${
                        light
                            ? "bg-g-500 group-hover:bg-white dark:bg-white dark:group-hover:bg-gray-900"
                            : "bg-white group-hover:bg-g-500 dark:bg-gray-900 dark:group-hover:bg-white"
                    }`}
                >
                    <Icon
                        className={`!w-5 !h-5 transition-colors ${
                            light
                                ? "fill-white group-hover:fill-g-500 dark:fill-gray-900 dark:group-hover:fill-white"
                                : "fill-g-500 group-hover:fill-white dark:fill-white dark:group-hover:fill-gray-900"
                        }`}
                        name="arrow-right"
                    />
                </span>
            )}
        </>
    );

    const classNames = `btn group ${
        light
            ? "border-w-50 bg-w-50 text-g-500 hover:bg-g-500 hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-white dark:hover:text-gray-900"
            : "border-g-500 bg-g-500 text-w-50 hover:bg-white hover:text-g-500 dark:border-white dark:bg-white dark:text-gray-900 dark:hover:bg-gray-900 dark:hover:text-white"
    } ${className || ""}`;

    return href ? (
        <Link href={href} className={classNames} onClick={onClick}>
            {buttonContent}
        </Link>
    ) : (
        <button className={classNames} onClick={onClick}>
            {buttonContent}
        </button>
    );
};

export default Button;
