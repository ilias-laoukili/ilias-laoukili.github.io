import type { Project } from "@/types";

export const PROJECTS: Project[] = [
  {
    title: "Graph Sparsification",
    slug: "graph-sparsification",
    date: "2025-11-17",
    category: "Research",
    tags: ["Graph Neural Networks", "Sparsification", "Graph Topology", "Tremplin Recherche"],
    excerpt: "My Tremplin Recherche project takes a different approach: if the geometry of the graph is the problem, the only real solution is to modify the geometry itself. This research reframes sparsification as a geometric intervention to fix the graph, not just compress it—reducing computational costs by up to 40% for large-scale networks while preserving critical structural properties.",
    imageUrl: "/images/projects/graph-research.png",
    pdfUrl: "/images/projects/graph-research.pdf",
    githubUrl: "https://github.com/ilias-laoukili/gnn-sparsification-research",
  },
  {
    title: "Decoding Sound: AI Audio Analyzer",
    slug: "sentim-audio-emotion-analysis",
    date: "2025-11-20",
    category: "Projects",
    tags: ["Python", "DSP", "Machine Learning", "Streamlit"],
    excerpt: "Can a computer tell if you are happy or sad just by listening to your voice? I built an interactive web application featuring a Custom DSP Vocoder for audio feature extraction and a Random Forest Classifier for emotion prediction, achieving 85% accuracy.",
    imageUrl: "/images/projects/audio-analyzer.png",
    demoUrl: "https://sentim-app.streamlit.app/",
    githubUrl: "https://github.com/ilias-laoukili/sentim-app",
  },
  {
    title: "synth-graph-rs: Synthetic Graph Generator",
    slug: "synth-graph-rs",
    date: "2026-04-16",
    category: "Projects",
    tags: ["Rust", "Python", "GNN", "Graph Generation", "PyO3"],
    excerpt: "A high-performance synthetic graph generator written in Rust with Python bindings, supporting SBM, DC-SBM, and cSBM models for controlled GNN benchmarking. Outputs directly to NumPy and PyTorch Geometric formats.",
    imageUrl: "/images/projects/synth-graph-rs.png",
    githubUrl: "https://github.com/ilias-laoukili/synth-graph-rs",
  },
];