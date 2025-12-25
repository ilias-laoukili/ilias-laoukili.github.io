export const PROFILE = {
  name: "Ilias Laoukili",
  title: "AI & Cybersecurity Engineering Student",
  subtitle: "Engineering student at ESIEE Paris specializing in Artificial Intelligence and Cybersecurity. Passionate about developing innovative solutions that combine machine learning with security applications.",
  introduction: "I am an AI & Cybersecurity Engineering Student at ESIEE Paris, driven by a passion for developing innovative solutions. I leverage hands-on expertise in Computer Vision, Machine Learning (YOLO), and secure system design to solve complex problems and build practical solutions that make a real-world impact. I am currently seeking a 4-month internship between May and August 2026.",
  email: "ilias.laoukili@proton.me",
  cvPath: "/US_Ilias_Laoukili_CV.pdf",
  socials: {
    github: "https://github.com/ilias-laoukili",
    linkedin: "https://www.linkedin.com/in/ilias-laoukili",
  },
};

export const STATS = [ { label: "Academic Performance Boost", value: "45%", description: "Average improvement for 45+ students tutored in STEM" }, { label: "Detection Accuracy", value: "92%", description: "Achieved in real-time fire and smoke detection system" }, { label: "Years of Rigorous STEM Study", value: "4+", description: "Completed selective Preparatory Classes and currently pursuing an Engineering Master's" }, { label: "False Positive Reduction", value: "30%", description: "Achieved by integrating the YOLO model with drone navigation" }, ];

export const SKILLS = [ { category: "AI & Machine Learning - Intermediate", items: ["YOLO & Computer Vision", "Neural Networks", "Model Optimization", "Automation", "Deep Learning"], }, { category: "Cybersecurity - Intermediate", items: ["Network Protocols", "Wireshark", "System Security Fundamentals", "Linux Hardening"], }, { category: "Tools & Platforms - Proficient", items: ["Git/GitHub", "Unity", "Linux", "SQLite", "Microsoft Office Suite"], }, { category: "Programming - Advanced", items: ["Python (Advanced)", "Java & C", "SQL", "OOP", "C#", "Data Structures"], }, ];

export const RESEARCH_INTERESTS = [ { title: "Computer Vision Applications", description: "Exploring real-time object detection and image recognition systems using YOLO and deep learning frameworks. Focus on practical applications like fire detection, autonomous systems, and safety monitoring.", icon: "ComputerCloudIcon", }, { title: "AI Security & System Hardening", description: "Investigating vulnerabilities in AI systems and developing secure implementations. Combining cybersecurity principles with machine learning to build robust, tamper-resistant intelligent systems.", icon: "KnightShieldIcon", }, { title: "Software Architecture & OOP", description: "Designing scalable software solutions using object-oriented programming principles. Experience in building clean, maintainable codebases with proper design patterns and documentation.", icon: "SoftwareIcon", }, { title: "Educational Technology", description: "Passionate about making complex technical concepts accessible through tutoring and mentorship. Developing innovative teaching methods to improve learning outcomes in STEM fields.", icon: "Brain01Icon", }, ];

export const PROJECTS = [
  {
    title: "Drone Fire and Smoke Detection System",
    slug: "drone-fire-and-smoke-detection-system",
    date: "2025-11-06",
    category: "Projects",
    tags: ["Python", "YOLO", "ComputerVision", "MachineLearning", "AI"],
    excerpt: "A real-time fire and smoke detection system developed using a fine-tuned YOLO model. The project achieved 92% detection accuracy and was integrated with the drone navigation system, leading to a 30% reduction in false positives.",
    imageUrl: "/projects/drone-detection.jpg",
  },
  {
    title: "Echoes of Innocence 2D Java Game",
    slug: "echoes-of-innocence-2d-java-game",
    date: "2025-11-07",
    category: "Projects",
    tags: ["Java", "OOP", "Software Architecture", "Game Development"],
    excerpt: "A 2D game developed from scratch, emphasizing robust Object-Oriented Programming (OOP) principles and optimized software architecture. This project demonstrates strong proficiency in Java and efficient performance across more than five levels.",
    imageUrl: "/projects/echoes-game.png",
  },
  {
    title: "Graph Sparsification",
    slug: "graph-sparsification",
    date: "2025-11-17",
    category: "Research",
    tags: ["Graph Neural Networks", "Sparsification", "Graph Topology", "Tremplin Recherche"],
    excerpt: "My Tremplin Recherche project takes a different approach: if the geometry of the graph is the problem, the only real solution is to modify the geometry itself. This research reframes sparsification as a geometric intervention to fix the graph, not just compress it.",
    imageUrl: "/projects/graph-research.png",
    pdfUrl: "/projects/graph-sparsification.pdf",
    extraImage: "/projects/graph-research.png",
  },
  {
    title: "Decoding Sound: AI Audio Analyzer",
    slug: "sentim-audio-emotion-analysis",
    date: "2025-11-20",
    category: "Projects",
    tags: ["Python", "DSP", "Machine Learning", "Streamlit"],
    excerpt: "Can a computer tell if you are happy or sad just by listening to your voice? I built an interactive web application to find out using Digital Signal Processing and Random Forest classifiers.",
    imageUrl: "/projects/audio-analyzer.png",
  },
];