# synth-graph-rs: Synthetischer Graphgenerator für GNN-Forschung

GNN-Benchmarking hat ein bekanntes Problem: Die meisten "Standard"-Datensätze sind zu klein, zu sauber und zu ähnlich zueinander. Wer ein Modell auf Cora oder Citeseer optimiert, lernt die Eigenschaften dieser spezifischen Graphen — nicht allgemeine Grapheigenschaften.

**synth-graph-rs** ist ein Tool, das ich entwickelt habe, um dieses Problem zu lösen. Es generiert synthetische Graphen mit präzise kontrollierten Eigenschaften, sodass GNN-Verhalten unter exakten Bedingungen getestet werden kann.

### Warum Rust?

Graphgenerierung im großen Maßstab ist CPU-gebunden und natürlich parallelisierbar. Pythons GIL macht daraus einen Flaschenhals. Der Rust-Kern übernimmt die Generierung ohne GIL-Overhead und stellt saubere Python-Bindings über **PyO3** bereit, sodass der Rest der Forschungspipeline in Python verbleibt.

### Unterstützte Graphmodelle

**Stochastic Block Model (SBM)**

Das Standardmodell für synthetische Graphgenerierung. Knoten werden Gemeinschaften zugewiesen; Kanten werden mit Wahrscheinlichkeit `p_in` (innerhalb der Gemeinschaft) und `p_out` (zwischen Gemeinschaften) gezogen. Steuert direkt die Homophilie — die zentrale Variable in der modernen GNN-Forschung.

**Degree-Corrected SBM (DC-SBM)**

Erweitert das SBM um heterogene Gradverteilungen. Echte Graphen haben Hubs; das klassische SBM nicht. DC-SBM erlaubt Gradheterogenität bei erhaltener Gemeinschaftsstruktur.

**Contextual SBM (cSBM)**

Fügt Knotenfeatures mit kontrolliertem Signal-Rausch-Verhältnis hinzu. Nützlich, um zu isolieren, ob ein GNN Struktur, Features oder beides nutzt.

### Ausgabeformate

- **NumPy-Arrays** — Adjazenzmatrix + Feature-Matrix, bereit für scikit-learn-Pipelines
- **PyTorch Geometric `Data`-Objekte** — direkt kompatibel mit PyG-Trainingsschleifen
- **JSON** — für Speicherung, Reproduzierbarkeit und Benchmark-Konfigurationen

### Einsatz in meiner Forschung

Ich habe synth-graph-rs speziell für meine [Graphsparsifizierungsforschung](/blog/graph-sparsification) entwickelt. Um zu testen, ob Kantenlöschungsmethoden die GNN-Genauigkeit erhalten, benötige ich Graphen mit bekannten Homophilieniveaus und kontrollierter Struktur — die echte Datensätze nicht bieten.
