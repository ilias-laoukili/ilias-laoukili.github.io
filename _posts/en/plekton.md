# plekton: Synthetic Graph Generation, Blockmodels, and Spectral Sparsification in Rust

GNN benchmarking has a recurring problem: most "standard" benchmark datasets are too small, too clean, and structurally too similar to one another. When you tune a model on Cora or CiteSeer, you often end up fitting dataset-specific quirks rather than testing how an architecture responds to graph structure.

**plekton** is a pure-Rust library with zero-copy Python bindings (**PyO3**) built to make controlled graph benchmarking fast and reproducible. It combines synthetic graph generation, stochastic blockmodel fitting, structural metrics, and spectral sparsification in a single engine.

### Why Rust with Zero-Copy Python Bindings?

Graph generation, structural analysis, and spectral sparsification at scale are CPU-bound and naturally parallelizable. Python's GIL turns repeated parameter sweeps into a bottleneck. Implementing the computational core in pure **Rust** eliminates GIL overhead while exposing zero-copy **NumPy** / **PyTorch Geometric** interfaces so empirical research pipelines stay ergonomics-first in Python.

### Core Capabilities

- **Synthetic Graph Models:** Stochastic Block Model (**SBM**), Degree-Corrected SBM (**DC-SBM**), and Contextual SBM (**cSBM**) with explicit control over homophily, degree heterogeneity, and feature signal-to-noise ratio.
- **Blockmodel Fitting & Structural Metrics:** Fit blockmodels to empirical graphs and compute structural diagnostics directly in Rust to characterize topology before and after graph interventions.
- **Spectral Sparsification:** Reduce edge density while preserving spectral and structural properties for scalable GNN training and ablation studies.

### Key Controls

| Parameter | What it controls |
|---|---|
| `n_nodes` | Graph scale |
| `n_classes` | Number of communities |
| `p_in` / `p_out` | Homophily ratio |
| `degree_seq` | Degree heterogeneity (DC-SBM) |
| `feature_snr` | Feature signal-to-noise ratio (cSBM) |

### Role in My Research

`plekton` grew out of my [graph sparsification research](/en/blog/graph-sparsification/) at LAMA (Université Gustave Eiffel). Evaluating whether edge-removal methods preserve GNN accuracy requires sweeping across known homophily regimes and controlled topologies without being confounded by idiosyncrasies of a handful of citation graphs.
