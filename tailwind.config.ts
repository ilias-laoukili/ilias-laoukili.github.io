import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./templates/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
    	screens: {
    		'5xl': {
    			max: '2299px'
    		},
    		'4xl': {
    			max: '1899px'
    		},
    		'3xl': {
    			max: '1719px'
    		},
    		'2xl': {
    			max: '1419px'
    		},
    		xl: {
    			max: '1179px'
    		},
    		lg: {
    			max: '1023px'
    		},
    		md: {
    			max: '767px'
    		},
    		sm: {
    			max: '480px'
    		}
    	},
    	extend: {
    		colors: {
    			g: {
    				'50': '#ebebeb',
    				'75': '#adadad',
    				'100': '#8a8a8a',
    				'200': '#585858',
    				'300': '#363636',
    				'400': '#262626',
    				'500': '#212121'
    			},
    			w: {
    				'50': '#fdfdfd',
    				'75': '#f5f5f5',
    				'100': '#f1f1f1',
    				'200': '#eaeaea',
    				'300': '#e6e6e6',
    				'400': '#a1a1a1',
    				'500': '#8c8c8c'
    			},
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		zIndex: {
    			'1': '1',
    			'2': '2',
    			'3': '3',
    			'4': '4',
    			'5': '5'
    		},
    		spacing: {
    			'13': '3.25rem',
    			'15': '3.75rem',
    			'17': '4.25rem',
    			'18': '4.5rem',
    			'19': '4.75rem',
    			'21': '5.25rem',
    			'22': '5.5rem',
    			'23': '5.75rem',
    			'25': '6.25rem',
    			'26': '6.5rem',
    			'30': '7.5rem',
    			'34': '8.5rem',
    			'38': '9.5rem',
    			'42': '10.5rem',
    			'54': '13.5rem',
    			'58': '14.5rem',
    			'0.25': '0.0625rem',
    			'0.75': '0.1875rem',
    			'4.5': '1.125rem',
    			'5.5': '1.375rem',
    			'6.5': '1.75rem',
    			'7.5': '1.875rem',
    			'8.5': '2.125rem',
    			'9.5': '2.375rem'
    		},
    		transitionDuration: {
    			DEFAULT: '200ms'
    		},
    		transitionTimingFunction: {
    			DEFAULT: 'linear'
    		},
    		borderWidth: {
    			'0': '0',
    			'2': '0.125rem',
    			'3': '0.1875rem',
    			'4': '0.25rem',
    			'8': '0.5rem',
    			DEFAULT: '0.0625rem'
    		},
    		fontFamily: {
    			sans: [
    				'var(--font-inter)'
    			],
    			'inter-tight': [
    				'var(--font-inter-tight)'
    			]
    		},
    		fontSize: {
    			'0': [
    				'0',
    				'0'
    			]
    		},
    		backgroundImage: {
    			'radial-gradient': 'radial-gradient(90% 100% at 50% 20%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)'
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		animation: {
    			aurora: "aurora 60s linear infinite",
    		},
    		keyframes: {
    			aurora: {
    				from: {
    					backgroundPosition: "50% 50%, 50% 50%",
    				},
    				to: {
    					backgroundPosition: "350% 50%, 350% 50%",
    				},
    			},
    		}
    	}
    },
    plugins: [
        require("@headlessui/tailwindcss")({ prefix: "ui" }),
        plugin(function ({ addBase, addComponents, addUtilities }) {
            addBase({
                html: {
                    "@apply text-[calc(1rem+.15vw)] 4xl:text-[calc(1rem+.1vw)] 3xl:text-[1rem]": {},
                },
            });
            addComponents({
                ".container": {
                    "@apply max-w-[96rem] mx-auto px-12 3xl:max-w-[90rem] lg:px-8 md:px-5":
                        {},
                },
                ".btn": {
                    "@apply inline-flex items-center justify-center h-12 rounded-full px-4.5 border-2 font-sans font-medium text-body transition-colors":
                        {},
                },
                ".label": {
                    "@apply text-body font-normal text-g-100 md:text-caption":
                        {},
                },
                ".pt150": {
                    "@apply pt-[9.375rem] xl:pt-30 lg:pt-25":
                        {},
                },
                ".pb150": {
                    "@apply pb-[9.375rem] xl:pb-30 lg:pb-25":
                        {},
                },
                ".py150": {
                    "@apply py-[9.375rem] xl:py-30 lg:py-25":
                        {},
                },
                ".text-display": {
                    "@apply font-inter-tight text-[4rem] leading-[4.8rem] font-medium -tracking-[.01em] xl:text-[3rem] xl:leading-[3.3rem]":
                        {},
                },
                ".text-h1": {
                    "@apply font-inter-tight text-[3rem] leading-[3.75rem] font-medium xl:text-[2.19rem] xl:leading-[2.73rem]":
                        {},
                },
                ".text-h2": {
                    "@apply font-inter-tight text-[2.5rem] leading-[3.125rem] font-medium xl:text-[1.875rem] xl:leading-[2.34rem]":
                        {},
                },
                ".text-h3": {
                    "@apply font-inter-tight text-[1.625rem] leading-[2.03rem] font-medium":
                        {},
                },
                ".text-h4": {
                    "@apply font-inter-tight text-[1.5rem] leading-[1.875rem] font-medium":
                        {},
                },
                ".text-h5": {
                    "@apply font-inter-tight text-[1.25rem] leading-[1.56rem] font-medium xl:text-[1.125rem] xl:leading-[1.41rem]":
                        {},
                },
                ".text-paragraph": {
                    "@apply text-[1.125rem] leading-[1.6875rem]":
                        {},
                },
                ".text-body": {
                    "@apply text-[1rem] leading-[1.5rem]":
                        {},
                },
                ".text-caption": {
                    "@apply text-[0.875rem] leading-[1.225rem]":
                        {},
                },
            });
            addUtilities({
                ".tap-highlight-color": {
                    "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)",
                },
            });
        }),
        require("tailwindcss-animate")
    ],
};
export default config;
