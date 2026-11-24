import type { Project } from "@/types";

export const PROJECTS: Project[] = [
    {
        title: {
            en: "plekton — Synthetic Graph & Spectral Sparsification Library",
            fr: "plekton — Bibliothèque Rust/Python de graphes synthétiques et sparsification",
        },
        slug: "plekton",
        date: "2026-11-23",
        category: {
            en: "Systems / Rust",
            fr: "Systèmes / Rust",
        },
        tags: ["Rust", "PyO3", "Python", "GNN", "Sparsification"],
        excerpt: {
            en: "Pure-Rust library with zero-copy Python bindings for synthetic graph generation (SBM, DC-SBM, cSBM), blockmodel fitting, structural metrics, and spectral sparsification.",
            fr: "Bibliothèque en Rust pur avec bindings Python zero-copy pour la génération de graphes synthétiques (SBM, DC-SBM, cSBM), l'ajustement de modèles à blocs, les métriques structurelles et la sparsification spectrale.",
        },
        imageUrl: "/images/projects/plekton.png",
        imageAlt: {
            en: "Stochastic block model graph visualization with three distinct color-coded communities on a dark slate canvas",
            fr: "Visualisation d'un graphe de modèle à blocs stochastique à trois communautés distinctes sur fond sombre",
        },
        imageCaption: {
            en: "FIG. 01 — Synthetic 3-community Stochastic Block Model (SBM) topology generated with plekton.",
            fr: "FIG. 01 — Topologie synthétique d'un modèle à blocs stochastique (SBM) à 3 communautés générée avec plekton.",
        },
        githubUrl: "https://github.com/ilias-laoukili/plekton",
    },
    {
        title: {
            en: "Graph Sparsification for GNN Optimization",
            fr: "Sparsification de graphes pour l'optimisation des GNN",
        },
        slug: "graph-sparsification",
        date: "2026-05-01",
        category: {
            en: "Research",
            fr: "Recherche",
        },
        tags: ["GNN", "Sparsification", "Graph Topology", "LAMA"],
        excerpt: {
            en: "Research conducted at LAMA (Université Gustave Eiffel) investigating deterministic graph sparsification trade-offs between GNN performance and computational efficiency.",
            fr: "Travaux menés au LAMA (Université Gustave Eiffel) sur les compromis entre précision et efficacité de calcul des réseaux de neurones sur graphes par sparsification déterministe.",
        },
        imageUrl: "/images/projects/graph-research.png",
        imageAlt: {
            en: "Side-by-side comparison of a dense graph reduced to a spectral sparsified backbone with preserved Laplacian eigenvalue spectrum",
            fr: "Comparaison entre un graphe dense et son sous-graphe sparsifié préservant le spectre des valeurs propres du laplacien",
        },
        imageCaption: {
            en: "FIG. 02 — Dense-to-sparse spectral reduction preserving Laplacian eigenvalue structure.",
            fr: "FIG. 02 — Réduction spectrale d'un graphe dense préservant le spectre du laplacien.",
        },
        pdfUrl: "/images/projects/graph-research.pdf",
        githubUrl: "https://github.com/ilias-laoukili/gnn-sparsification-research",
    },
    {
        title: {
            en: "Sentim — Audio Emotion Analysis",
            fr: "Sentim — Analyse d'émotions audio par IA",
        },
        slug: "sentim-audio-emotion-analysis",
        date: "2025-11-20",
        category: {
            en: "Applied AI",
            fr: "IA appliquée",
        },
        tags: ["Python", "PyTorch", "Librosa", "Streamlit"],
        excerpt: {
            en: "End-to-end speech emotion classification platform (8 emotions, RAVDESS) combining DSP features with 2D-spectrogram CNN/ResNet models outperforming Random Forest baselines.",
            fr: "Plateforme complète de classification de 8 émotions vocales (RAVDESS), combinant extraction DSP et modèles CNN/ResNet sur spectrogrammes 2D surpassant la baseline Random Forest.",
        },
        imageUrl: "/images/projects/audio-analyzer.png",
        imageAlt: {
            en: "Dark scientific Mel-spectrogram and aligned time-domain speech waveform used for 2D CNN emotion classification",
            fr: "Spectrogramme Mel scientifique sur fond sombre et forme d'onde vocale alignée utilisés pour la classification CNN 2D",
        },
        imageCaption: {
            en: "FIG. 03 — 2D Mel-spectrogram and acoustic waveform representation fed into the PyTorch CNN/ResNet classifier.",
            fr: "FIG. 03 — Spectrogramme Mel 2D et forme d'onde acoustique analysés par le classifieur CNN/ResNet PyTorch.",
        },
        demoUrl: "https://sentim-app.streamlit.app/",
        githubUrl: "https://github.com/ilias-laoukili/sentim-app",
    },
];
