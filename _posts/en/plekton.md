## Why I wrote plekton

During my [graph sparsification experiments](/en/blog/graph-sparsification/) at LAMA (Université Gustave Eiffel), I kept running into the same limitation: standard GNN citation datasets (Cora, CiteSeer, PubMed) are small, structurally narrow, and hard to disentangle. When an edge-pruning method wins on Cora and loses on Roman-empire, it is difficult to tell whether the difference comes from homophily, degree skew, clustering, or feature noise.

I needed a way to generate synthetic graphs with explicit control over those parameters, fit blockmodels to real graphs, and run spectral sparsification inside Python hyperparameter sweeps without waiting minutes per graph in NetworkX.

Started in March 2026 as an early Rust prototype (`synth-graph-rs`) and later unified under the name *plekton* (from Greek *πλεκτόν*, "woven"), the library automates the synthesis and sparsification of structured graphs—much like crochet, where every stitch depends on local topology and resists naïve mechanization.

## Design and API

The core lives in Rust (`crates/`) and exposes zero-copy NumPy arrays to Python via PyO3. Every generator returns a `plekton.Graph` holding `n_nodes` and a read-only `(E, 2)` `int64` edge array (`u < v`, undirected), with `graph.edge_index` returning the `(2, 2E)` layout expected by PyTorch Geometric.

```python
import plekton
from plekton import sparsify

graph = plekton.generate_sbm(1_000, 4, p_in=0.05, p_out=0.002, seed=42)
scores = sparsify.approx_effective_resistance(graph, seed=42)
keep = sparsify.select_mask(graph, scores, "sampled", retention_ratio=0.5, seed=42)
sparse = graph.edge_subgraph(keep)
```

Functions reject malformed inputs early—such as `(2, E)` arrays, duplicate reverse edges, or out-of-range node IDs—rather than silently miscounting degrees or edges.

## What is inside

- **Generation:** sparse-time SBM via geometric skip sampling, exact DC-SBM using dyadic weight buckets so heavy Pareto tails do not collapse to O(N²), contextual SBM (`cSBM`) with correlated node features, Barabási–Albert, and `mixing_graph` for multi-attribute mixing matrices solved by iterative proportional fitting (IPF).
- **Estimation & metrics:** method-of-moments DC-SBM fitting, seeded label propagation, SLPA overlapping communities, homophily, Newman's assortativity, clustering, transitivity, and two-sample KS distance on degree distributions.
- **Sparsification:** Spielman–Srivastava approximate effective resistance (Johnson–Lindenstrauss projection + conjugate-gradient Laplacian solver parallelized with Rayon), metric backbone, and score-based selection (Jaccard, Adamic–Adar, degree product, feature cosine) with a connectivity guard so originally connected nodes are not left isolated.
- **ML utilities:** leakage-free group-disjoint and chronological splits (`plekton.splits`) and direct converters for PyTorch Geometric and NetworkX.

## Measured performance

Benchmarked with `python benchmarks/bench.py --quick` on Apple A18 Pro (arm64, Python 3.11), median of 3 timed runs in fresh subprocesses after warm-up (10,000 nodes, 5 blocks, mean degree 10, homophily 0.75):

| Task | Engine | Edges | Median (ms) | Peak RAM (MiB) |
|---|---|---:|---:|---:|
| SBM | `plekton` | 50,095 | 2.52 | 37.7 |
| SBM | `networkx` | 49,658 | 504.53 | 65.2 |
| DC-SBM (γ = 2.5) | `plekton` | 48,295 | 4.61 | 37.7 |
| cSBM (F = 32) | `plekton` | 50,095 | 3.45 | 39.7 |
| Barabási–Albert (m = 5) | `plekton` | 49,985 | 1.21 | 39.0 |

## Trade-offs

- Graphs are assumed simple and undirected in the core API (except the directed option in `mixing_graph`).
- Exact global transitivity is skipped above 20,000 nodes by default to avoid surprise cubic-time stalls.
- Installation currently builds from source with a Rust toolchain (`pip install git+https://github.com/ilias-laoukili/plekton`); prebuilt PyPI wheels are not published yet.
