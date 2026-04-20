# synth-graph-rs : Générateur de Graphes Synthétiques pour la Recherche sur les GNN

L'évaluation des GNN souffre d'un problème rarement évoqué : la plupart des jeux de données "standard" sont trop petits, trop propres et trop similaires entre eux. Quand on optimise un modèle sur Cora ou Citeseer, on apprend les spécificités de ces graphes précis — pas les propriétés générales des graphes.

**synth-graph-rs** est un outil que j'ai développé pour résoudre ce problème. Il génère des graphes synthétiques aux propriétés précisément contrôlées, permettant de tester le comportement des GNN dans des conditions exactes plutôt que de dépendre des caractéristiques d'un jeu de données réel.

### Pourquoi Rust ?

La génération de graphes à grande échelle est liée au CPU et naturellement parallélisable. Le GIL de Python en fait un goulot d'étranglement. Le cœur Rust gère la génération sans overhead lié au GIL, puis expose des bindings Python propres via **PyO3** pour que le reste du pipeline de recherche reste en Python.

### Modèles de Graphes Supportés

**Stochastic Block Model (SBM)**

Le modèle de référence pour la génération de graphes synthétiques. Les nœuds sont assignés à des communautés ; les arêtes sont tirées avec probabilité `p_in` (intra-communauté) et `p_out` (inter-communauté). Permet de contrôler directement l'homophilie — variable clé dans la recherche moderne sur les GNN.

**DC-SBM (Degree-Corrected SBM)**

Étend le SBM avec des distributions de degrés hétérogènes. Les graphes réels ont des hubs ; le SBM classique non. Le DC-SBM permet d'introduire une hétérogénéité de degrés tout en préservant la structure en communautés.

**cSBM (Contextual SBM)**

Ajoute des features de nœuds avec un rapport signal/bruit contrôlé. On définit la quantité d'information que les features portent sur l'appartenance aux communautés — utile pour déterminer si un GNN utilise la structure, les features, ou les deux.

### Paramètres Clés

| Paramètre | Ce qu'il contrôle |
|---|---|
| `n_nodes` | Taille du graphe |
| `n_classes` | Nombre de communautés |
| `p_in` / `p_out` | Ratio d'homophilie |
| `degree_seq` | Distribution des degrés (DC-SBM) |
| `feature_snr` | Rapport signal/bruit des features (cSBM) |

### Formats de Sortie

- **Arrays NumPy** — matrice d'adjacence + matrice de features, prêts pour les pipelines scikit-learn
- **Objets PyTorch Geometric `Data`** — compatibles directement avec toute boucle d'entraînement PyG
- **JSON** — pour le stockage, la reproductibilité et le partage de configurations de benchmarks

### Usage dans ma Recherche

J'ai développé synth-graph-rs spécifiquement pour soutenir ma [recherche sur la sparisification de graphes](/blog/graph-sparsification). Pour tester si les méthodes de suppression d'arêtes préservent la précision des GNN, j'ai besoin de graphes avec des niveaux d'homophilie connus et une structure contrôlée — que les jeux de données réels ne fournissent pas.
