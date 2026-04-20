# synth-graph-rs: Synthetic Graph Generator for GNN Research

GNN benchmarking has a dirty secret: most "standard" datasets are too small, too clean, and too similar to each other. When you tune a model on Cora or Citeseer, you're not learning about graphs — you're learning about those specific graphs.

**synth-graph-rs** is a tool I built to fix that. It generates synthetic graphs with precise, controlled properties, so you can test GNN behavior under exact conditions rather than hoping a real-world dataset happens to have the property you care about.

### Why Rust?

Graph generation at scale is CPU-bound and embarrassingly parallel. Python's GIL turns that into a bottleneck. The Rust core handles generation with no GIL overhead, then exposes clean Python bindings via **PyO3** so the rest of the research pipeline stays in Python.

### Supported Graph Models

**Stochastic Block Model (SBM)**

The workhorse of synthetic graph generation. Nodes are assigned to communities; edges are drawn with probability `p_in` (within community) and `p_out` (between communities). Directly controls homophily — the key variable in most modern GNN research.

**Degree-Corrected SBM (DC-SBM)**

Extends SBM with heterogeneous degree distributions. Real graphs have hubs; vanilla SBM doesn't. DC-SBM lets you introduce degree heterogeneity while preserving community structure, for more realistic benchmarks.

**Contextual SBM (cSBM)**

Adds node features with a controlled signal-to-noise ratio. You set how much information the features carry about community membership — useful for isolating whether a GNN is using structure, features, or both.

### Key Parameters

| Parameter | What it controls |
|---|---|
| `n_nodes` | Graph size |
| `n_classes` | Number of communities |
| `p_in` / `p_out` | Homophily ratio |
| `degree_seq` | Degree distribution (DC-SBM) |
| `feature_snr` | Feature signal-to-noise ratio (cSBM) |

### Output Formats

- **NumPy arrays** — adjacency matrix + feature matrix, ready for scikit-learn pipelines
- **PyTorch Geometric `Data` objects** — drop-in for any PyG training loop
- **JSON** — for storage, reproducibility, and sharing benchmark configs

### How I Use It

I built synth-graph-rs specifically to support my [graph sparsification research](/blog/graph-sparsification). When testing whether edge removal methods preserve GNN accuracy, I need graphs with known homophily levels and controlled structure. Real datasets don't give you that control — synthetic ones do.

The tool lets me run experiments like: "does Jaccard-based sparsification degrade accuracy more on heterophilic graphs than homophilic ones?" and get a clean answer, not one confounded by dataset-specific quirks.
