## Pourquoi j'ai écrit plekton

Pendant mes [expériences de sparsification de graphes](/fr/blog/graph-sparsification/) au LAMA (Université Gustave Eiffel), je retombais toujours sur la même limite : les jeux de données classiques de GNN (Cora, CiteSeer, PubMed) sont petits, peu variés et mêlent plusieurs effets à la fois. Quand une méthode d'élagage d'arêtes marche sur Cora et échoue sur Roman-empire, il est difficile de savoir si l'écart vient de l'homophilie, de la distribution des degrés, du clustering ou du bruit dans les attributs.

J'avais besoin d'un outil pour générer des graphes synthétiques en contrôlant séparément chacun de ces facteurs, ajuster des modèles à blocs sur des graphes réels et exécuter la sparsification spectrale dans mes balayages Python sans perdre plusieurs minutes par graphe avec NetworkX.

Le nom vient du grec *πλεκτόν* (« tissé »). Comme le crochet — où chaque maille dépend de sa topologie locale et résiste à une mécanisation naïve — `plekton` automatise la synthèse et la sparsification de graphes structurés.

## Architecture et API

Le moteur est écrit en Rust (`crates/`) et expose des tableaux NumPy sans copie à Python via PyO3. Chaque générateur renvoie un objet `plekton.Graph` contenant `n_nodes` et un tableau `(E, 2)` en `int64` en lecture seule (chaque arête non orientée stockée une fois, `u < v`), avec `graph.edge_index` au format `(2, 2E)` attendu par PyTorch Geometric.

```python
import plekton
from plekton import sparsify

graph = plekton.generate_sbm(1_000, 4, p_in=0.05, p_out=0.002, seed=42)
scores = sparsify.approx_effective_resistance(graph, seed=42)
keep = sparsify.select_mask(graph, scores, "sampled", retention_ratio=0.5, seed=42)
sparse = graph.edge_subgraph(keep)
```

Les fonctions refusent explicitement les entrées ambiguës — tableau `(2, E)`, arêtes dupliquées dans les deux sens ou indices hors bornes — au lieu de fausser silencieusement les degrés.

## Ce que contient la bibliothèque

- **Génération :** SBM en temps O(E) par saut géométrique, DC-SBM exact par classes de poids dyadiques (évitant la dérive en O(N²) sur les lois de Pareto lourdes), cSBM avec attributs corrélés, Barabási–Albert, et `mixing_graph` pour imposer des matrices de mélange multi-attributs par ajustement proportionnel itératif (IPF).
- **Estimation et métriques :** ajustement DC-SBM par méthode des moments, propagation d'étiquettes, communautés recouvrantes SLPA, homophilie, assortativité de Newman, clustering, transitivité et distance KS sur les degrés.
- **Sparsification :** résistance effective approchée de Spielman–Srivastava (projection de Johnson–Lindenstrauss + solveur gradient conjugué sur le laplacien parallélisé avec Rayon), *metric backbone*, et sélection par score (Jaccard, Adamic–Adar, produit des degrés, cosinus d'attributs) avec garde-fou de connectivité pour ne pas isoler de nœuds connectés à l'origine.
- **Utilitaires ML :** découpages sans fuite de données (`plekton.splits` : groupes disjoints ou chronologiques avec embargo) et conversion directe vers PyTorch Geometric et NetworkX.

## Performances mesurées

Mesuré avec `python benchmarks/bench.py --quick` sur Apple A18 Pro (arm64, Python 3.11), médiane sur 3 exécutions dans des sous-processus isolés après échauffement (10 000 nœuds, 5 communautés, degré moyen 10, homophilie 0,75) :

| Tâche | Moteur | Arêtes | Médiane (ms) | RAM pic (Mio) |
|---|---|---:|---:|---:|
| SBM | `plekton` | 50 095 | 2,52 | 37,7 |
| SBM | `networkx` | 49 658 | 504,53 | 65,2 |
| DC-SBM (γ = 2,5) | `plekton` | 48 295 | 4,61 | 37,7 |
| cSBM (F = 32) | `plekton` | 50 095 | 3,45 | 39,7 |
| Barabási–Albert (m = 5) | `plekton` | 49 985 | 1,21 | 39,0 |

## Compromis assumés

- L'API centrale suppose des graphes simples non orientés (hors option orientée dans `mixing_graph`).
- La transitivité globale exacte est désactivée au-delà de 20 000 nœuds par défaut pour éviter un coût cubique involontaire.
- L'installation compile pour l'instant depuis les sources avec Rust (`pip install git+https://github.com/ilias-laoukili/plekton`) ; les wheels PyPI ne sont pas encore publiés.
