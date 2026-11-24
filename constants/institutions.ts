import type { LocalizedString } from "@/types";

export type InstitutionLink = {
    label: LocalizedString;
    url: string;
};

export type InstitutionGlyph =
    | "shield"
    | "compass"
    | "nodes"
    | "book"
    | "crest"
    | "circuit"
    | "grid"
    | "cross";

export type InstitutionMeta = {
    code: string;
    glyph: InstitutionGlyph;
    links: InstitutionLink[];
};

export const INSTITUTIONS: Record<string, InstitutionMeta> = {
    mcn: {
        code: "MCN",
        glyph: "shield",
        links: [
            {
                label: {
                    en: "Ministère de la Cybersécurité et du Numérique (MCN)",
                    fr: "Ministère de la Cybersécurité et du Numérique (MCN)",
                },
                url: "https://www.quebec.ca/gouvernement/ministeres-et-organismes/ministere-de-la-cybersecurite-et-du-numerique",
            },
        ],
    },
    nyp: {
        code: "NYP",
        glyph: "compass",
        links: [
            {
                label: {
                    en: "Nanyang Polytechnic (NYP)",
                    fr: "Nanyang Polytechnic (NYP)",
                },
                url: "https://www.nyp.edu.sg/",
            },
        ],
    },
    lama: {
        code: "LAMA",
        glyph: "nodes",
        links: [
            {
                label: {
                    en: "Université Gustave Eiffel",
                    fr: "Université Gustave Eiffel",
                },
                url: "https://www.univ-gustave-eiffel.fr/",
            },
            {
                label: {
                    en: "LAMA (UMR 8050)",
                    fr: "LAMA (UMR 8050)",
                },
                url: "https://lama-umr8050.fr/",
            },
        ],
    },
    tutoring: {
        code: "EDU",
        glyph: "book",
        links: [
            {
                label: { en: "Complétude", fr: "Complétude" },
                url: "https://www.completude.com/",
            },
            {
                label: { en: "Parkours", fr: "Parkours" },
                url: "https://www.parkours.fr/",
            },
            {
                label: { en: "ESIEE Paris", fr: "ESIEE Paris" },
                url: "https://www.esiee.fr/",
            },
        ],
    },
    ulaval: {
        code: "UL",
        glyph: "crest",
        links: [
            {
                label: { en: "Université Laval", fr: "Université Laval" },
                url: "https://www.ulaval.ca/",
            },
        ],
    },
    esiee: {
        code: "ESIEE",
        glyph: "circuit",
        links: [
            {
                label: { en: "ESIEE Paris", fr: "ESIEE Paris" },
                url: "https://www.esiee.fr/",
            },
        ],
    },
    cpge: {
        code: "CPGE",
        glyph: "grid",
        links: [
            {
                label: { en: "Lycée Gustave Monod", fr: "Lycée Gustave Monod" },
                url: "https://www.lyc-polyvalent-monod-enghien.fr/",
            },
        ],
    },
    red_cross: {
        code: "CRF",
        glyph: "cross",
        links: [
            {
                label: { en: "French Red Cross", fr: "Croix-Rouge française" },
                url: "https://www.croix-rouge.fr/",
            },
        ],
    },
};
