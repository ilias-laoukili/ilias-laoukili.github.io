# plekton : Génération de graphes synthétiques, modèles à blocs et sparsification spectrale en Rust

L'évaluation des réseaux de neurones sur graphes (GNN) souffre d'un problème récurrent : la plupart des jeux de données de référence sont trop petits, trop propres et structurellement trop proches. En optimisant un modèle sur Cora ou CiteSeer, on apprend souvent les particularités d'un graphe précis plutôt que le comportement général de l'architecture.

**plekton** est une bibliothèque en **Rust pur** dotée de bindings Python **zero-copy** (**PyO3**), conçue pour rendre le benchmarking contrôlé de GNN rapide et reproductible. Elle réunit génération de graphes synthétiques, ajustement de modèles à blocs stochastiques, métriques structurelles et sparsification spectrale dans un même moteur.

### Pourquoi Rust avec des bindings Python zero-copy ?

La génération de graphes à grande échelle, le calcul de métriques et la sparsification spectrale sont limités par le CPU et naturellement parallélisables. Le GIL de Python ralentit fortement les balayages d'expériences. Le cœur en **Rust pur** supprime ce goulot d'étranglement tout en exposant des interfaces **NumPy** et **PyTorch Geometric** sans copie inutile afin que les pipelines d'expérimentation restent fluides en Python.

### Fonctionnalités principales

- **Modèles de graphes synthétiques :** Stochastic Block Model (**SBM**), Degree-Corrected SBM (**DC-SBM**) et Contextual SBM (**cSBM**), avec contrôle explicite de l'homophilie, de l'hétérogénéité des degrés et du rapport signal/bruit des attributs.
- **Ajustement de modèles à blocs & métriques structurelles :** ajustement sur graphes empiriques et calcul de diagnostics topologiques directement en Rust avant et après transformation du graphe.
- **Sparsification spectrale :** réduction de la densité d'arêtes tout en préservant les propriétés spectrales et structurelles pour accélérer l'entraînement et mener des études d'ablation.

### Paramètres clés

| Paramètre | Ce qu'il contrôle |
|---|---|
| `n_nodes` | Taille du graphe |
| `n_classes` | Nombre de communautés |
| `p_in` / `p_out` | Ratio d'homophilie |
| `degree_seq` | Hétérogénéité des degrés (DC-SBM) |
| `feature_snr` | Rapport signal/bruit des attributs (cSBM) |

### Rôle dans mes travaux

`plekton` est né de mes travaux sur la [sparsification de graphes](/fr/blog/graph-sparsification/) au LAMA (Université Gustave Eiffel). Mesurer si une méthode de suppression d'arêtes préserve la précision d'un GNN exige de faire varier proprement l'homophilie et la topologie sans dépendre des biais de quelques graphes de citations.
