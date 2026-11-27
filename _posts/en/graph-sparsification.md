## Question

This project was conducted at **LAMA (Université Gustave Eiffel)** under the supervision of **Maximilien Dreveton** as part of the *Tremplin Recherche* 2025–2026 program.

The central question is simple: can we remove a large fraction of edges from a graph *before* training a Graph Neural Network without hurting test accuracy—and when do topology- or feature-aware sparsification methods actually beat uniform random edge removal?

## Methods evaluated

We built a reproducible PyTorch Geometric evaluation framework covering both homophilic citation benchmarks and heterophilic graphs such as **Roman-empire**, using standard backbones (GCN, GraphSAGE, GAT) and an exact replication of **GCN\*** (Luo et al., NeurIPS 2024: 9 layers, hidden dimension 512, learned residuals, BatchNorm, dropout 0.5).

Five edge-scoring strategies were compared against a uniform random baseline:

| Method | Scoring criterion | Intuition |
|---|---|---|
| **Jaccard-T** | Neighborhood overlap | Favors edges inside dense local communities (homophilic graphs) |
| **AA-T** | Adamic–Adar (log-weighted overlap) | Downweights high-degree hubs compared to raw Jaccard |
| **FeatCos-T** | Cosine similarity of node features | Depends on node attributes rather than graph topology |
| **ApproxER-T** | Approximate effective resistance | Spectral importance in O(m log n) via Johnson–Lindenstrauss |
| **Metric Backbone** | Relaxed Triangle Inequality pruning | Removes edges bypassed by shorter paths, preserving geodesic distances |

For each score-based method, we also tested **inverse thresholding** (`-IT`, keeping low-scoring bridge edges), **weighted training** (`-W`), **probabilistic sampling**, and **degree-aware selection** so sparse nodes are not disconnected during pruning.

## Engineering constraints and link to plekton

Running full ablation sweeps across 26+ PyG datasets, multiple retention ratios, and multiple seeds quickly hit practical memory and runtime limits. I wrote Bash orchestration scripts to run lightweight sweeps in parallel while isolating memory-heavy datasets to avoid OOM crashes.

More importantly, real benchmark datasets conflate too many structural variables at once. That observation led directly to building [plekton](/en/blog/plekton/) in Rust, so edge-pruning methods can be stress-tested across synthetic graphs with controlled homophily, degree heterogeneity, and feature noise.
