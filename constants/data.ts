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
  },
];