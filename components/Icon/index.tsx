type IconsType = {
    [key: string]: string;
};

const icons: IconsType = {
    "arrow-down":
        "M12.726 15.536a1 1 0 0 1-1.414 0L5.655 9.879a1 1 0 0 1-.305-.711 1 1 0 0 1 .293-.716 1 1 0 0 1 .716-.293 1 1 0 0 1 .711.305l4.95 4.95 4.95-4.95a1 1 0 0 1 1.402.012 1 1 0 0 1 .012 1.402l-5.657 5.657z",
    "arrow-left":
        "M9.12 5.655l-5.657 5.657a1 1 0 0 0 0 1.414l5.657 5.657a1 1 0 0 0 1.402-.012 1 1 0 0 0 .012-1.402l-3.95-3.95h13.243a1 1 0 0 0 1-1 1 1 0 0 0-1-1H6.584l3.95-3.95a1 1 0 0 0 .305-.711 1 1 0 0 0-.293-.716 1 1 0 0 0-.716-.293 1 1 0 0 0-.711.305z",
    "arrow-right":
        "M14.877 18.359l5.657-5.657a1 1 0 0 0 0-1.414l-5.657-5.657a1 1 0 0 0-1.402.012 1 1 0 0 0-.012 1.402l3.95 3.95H4.17a1 1 0 0 0-1 1 1 1 0 0 0 1 1h13.243l-3.95 3.95a1 1 0 0 0-.305.711 1 1 0 0 0 .293.716 1 1 0 0 0 .716.293 1 1 0 0 0 .711-.305z",
};

type IconProps = {
    className?: string;
    name: keyof typeof icons;
    fill?: string;
};

const Icon = ({ className, name, fill }: IconProps) => (
    <svg
        className={`inline-flex w-6 h-6 ${className || ""}`}
        width={24}
        height={24}
        viewBox="0 0 24 24"
    >
        <path fill={fill} d={icons[name]}></path>
    </svg>
);

export default Icon;
