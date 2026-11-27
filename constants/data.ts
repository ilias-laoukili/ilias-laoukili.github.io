import type { Project } from "@/types";

export const PROJECTS: Project[] = [
    {
        title: {
            en: "manis — Offline Linux Hardening Audit CLI",
            fr: "manis — Audit de durcissement Linux hors ligne en Rust",
        },
        slug: "manis",
        date: "2026-01-24",
        category: {
            en: "Security / Rust",
            fr: "Sécurité / Rust",
        },
        tags: ["Rust", "Linux", "CIS", "ANSSI-BP-028", "SARIF"],
        excerpt: {
            en: "Static Rust binary (~1.9 MB, zero subprocesses) for offline Linux image and rootfs hardening audits in CI, with 103 rules (Debian family + linux-generic), SARIF 2.1.0, and drift diff.",
            fr: "Binaire Rust statique (~1,9 Mo, sans sous-processus) pour auditer hors ligne des images et rootfs Linux en CI : 103 règles (famille Debian + linux-generic), SARIF 2.1.0 et diff de dérive.",
        },
        imageUrl: "/images/projects/manis.svg",
        imageAlt: {
            en: "Dark schematic showing the manis emblem inside a confined rootfs boundary alongside profile rule counts and diff telemetry",
            fr: "Schéma sombre montrant l'emblème manis dans une frontière rootfs confinée avec la couverture des profils et le diff",
        },
        imageCaption: {
            en: "FIG. 01 — Confined offline rootfs audit model, profile coverage, and deterministic drift diff in manis v1.0.0.",
            fr: "FIG. 01 — Modèle d'audit rootfs hors ligne confiné, couverture des profils et diff de dérive dans manis v1.0.0.",
        },
        githubUrl: "https://github.com/ilias-laoukili/manis",
    },
    {
        title: {
            en: "plekton — Synthetic Graphs & Spectral Sparsification in Rust",
            fr: "plekton — Graphes synthétiques et sparsification spectrale en Rust",
        },
        slug: "plekton",
        date: "2026-03-12",
        category: {
            en: "Systems / Rust",
            fr: "Systèmes / Rust",
        },
        tags: ["Rust", "PyO3", "Python", "GNN", "Sparsification"],
        excerpt: {
            en: "Rust library with zero-copy Python bindings for synthetic graph generation (SBM, DC-SBM, cSBM), blockmodel fitting, structural metrics, and spectral sparsification.",
            fr: "Bibliothèque Rust avec bindings Python zero-copy pour générer des graphes synthétiques (SBM, DC-SBM, cSBM), ajuster des modèles à blocs, calculer des métriques et sparsifier des graphes.",
        },
        imageUrl: "/images/projects/plekton.png",
        imageAlt: {
            en: "Stochastic block model graph visualization with three distinct color-coded communities on a dark slate canvas",
            fr: "Visualisation d'un graphe de modèle à blocs stochastique à trois communautés distinctes sur fond sombre",
        },
        imageCaption: {
            en: "FIG. 02 — Synthetic 3-community Stochastic Block Model (SBM) topology generated with plekton.",
            fr: "FIG. 02 — Topologie synthétique d'un modèle à blocs stochastique (SBM) à 3 communautés générée avec plekton.",
        },
        githubUrl: "https://github.com/ilias-laoukili/plekton",
    },
    {
        title: {
            en: "Graph Sparsification for GNN Training",
            fr: "Sparsification de graphes pour l'entraînement de GNN",
        },
        slug: "graph-sparsification",
        date: "2026-05-01",
        category: {
            en: "Research",
            fr: "Recherche",
        },
        tags: ["GNN", "Sparsification", "PyTorch Geometric", "LAMA"],
        excerpt: {
            en: "Research conducted at LAMA (Université Gustave Eiffel) testing whether topological and spectral edge pruning can cut GNN training cost without degrading accuracy on homophilic and heterophilic graphs.",
            fr: "Travaux menés au LAMA (Université Gustave Eiffel) sur l'élagage topologique et spectral d'arêtes pour réduire le coût d'entraînement des GNN sur graphes homophiles et hétérophiles.",
        },
        imageUrl: "/images/projects/graph-research.png",
        imageAlt: {
            en: "Side-by-side comparison of a dense graph reduced to a spectral sparsified backbone with preserved Laplacian eigenvalue spectrum",
            fr: "Comparaison entre un graphe dense et son sous-graphe sparsifié préservant le spectre des valeurs propres du laplacien",
        },
        imageCaption: {
            en: "FIG. 03 — Dense graph reduced to a sparser backbone preserving key structural and spectral properties.",
            fr: "FIG. 03 — Réduction d'un graphe dense vers un sous-graphe préservant ses propriétés structurelles et spectrales.",
        },
        pdfUrl: "/images/projects/graph-research.pdf",
        githubUrl: "https://github.com/ilias-laoukili/gnn-sparsification-research",
    },
    {
        title: {
            en: "Sentim — Speech Emotion Recognition & DSP",
            fr: "Sentim — Reconnaissance d'émotions vocales et DSP",
        },
        slug: "sentim-audio-emotion-analysis",
        date: "2025-11-20",
        category: {
            en: "Applied AI",
            fr: "IA appliquée",
        },
        tags: ["Python", "PyTorch", "Librosa", "Streamlit"],
        excerpt: {
            en: "Audio processing and speech emotion classification on RAVDESS (8 classes), comparing classical DSP features with Random Forest against 2D Mel-spectrogram CNN and ResNet models.",
            fr: "Traitement audio et classification de 8 émotions vocales sur RAVDESS, comparant des descripteurs DSP + Random Forest à des modèles CNN et ResNet sur spectrogrammes Mel 2D.",
        },
        imageUrl: "/images/projects/audio-analyzer.png",
        imageAlt: {
            en: "Dark scientific Mel-spectrogram and aligned time-domain speech waveform used for 2D CNN emotion classification",
            fr: "Spectrogramme Mel scientifique sur fond sombre et forme d'onde vocale alignée utilisés pour la classification CNN 2D",
        },
        imageCaption: {
            en: "FIG. 04 — 2D Mel-spectrogram and aligned waveform used as input for the PyTorch CNN/ResNet models.",
            fr: "FIG. 04 — Spectrogramme Mel 2D et forme d'onde alignée utilisés en entrée des modèles CNN/ResNet PyTorch.",
        },
        demoUrl: "https://sentim-app.streamlit.app/",
        githubUrl: "https://github.com/ilias-laoukili/sentim-app",
    },
];
