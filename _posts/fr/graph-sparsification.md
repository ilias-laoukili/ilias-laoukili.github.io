## Question étudiée

Ce projet a été mené au **LAMA (Université Gustave Eiffel)** sous la direction de **Maximilien Dreveton** dans le cadre du programme *Tremplin Recherche* 2025–2026.

La question centrale est directe : peut-on supprimer une part importante des arêtes d'un graphe *avant* d'entraîner un réseau de neurones sur graphes (GNN) sans dégrader sa précision — et dans quels régimes des méthodes guidées par la topologie ou les attributs battent-elles réellement une suppression aléatoire uniforme ?

## Méthodes évaluées

Nous avons mis en place un protocole reproductible sous PyTorch Geometric couvrant à la fois des graphes homophiles (réseaux de citations) et des graphes hétérophiles comme **Roman-empire**, avec les architectures classiques (GCN, GraphSAGE, GAT) et une réplication exacte de **GCN\*** (Luo et al., NeurIPS 2024 : 9 couches, dimension cachée 512, résidus appris, BatchNorm, dropout 0,5).

Cinq stratégies de sélection d'arêtes ont été comparées à la baseline aléatoire :

| Méthode | Critère de score | Intuition |
|---|---|---|
| **Jaccard-T** | Recouvrement des voisinages | Privilégie les arêtes intra-communautaires (graphes homophiles) |
| **AA-T** | Adamic–Adar (recouvrement pondéré) | Pénalise les nœuds de très haut degré par rapport à Jaccard |
| **FeatCos-T** | Similarité cosinus des attributs | Repose sur les features des nœuds plutôt que sur la topologie |
| **ApproxER-T** | Résistance effective approchée | Importance spectrale via projection de Johnson–Lindenstrauss |
| **Metric Backbone** | Élagage par inégalité triangulaire relaxée | Supprime les arêtes redondantes en préservant les distances géodésiques |

Pour chaque score, nous avons également testé la sélection **inversée** (`-IT`, qui garde les ponts de faible score), la version **pondérée** (`-W`), l'**échantillonnage probabiliste** et une sélection **sensible au degré** afin d'éviter d'isoler les nœuds peu connectés.

## Contraintes pratiques et lien avec plekton

Exécuter les études d'ablation sur plus de 26 jeux de données PyG, plusieurs ratios de conservation et plusieurs graines a vite mis en évidence des limites de mémoire et de temps de calcul. J'ai écrit des scripts Bash pour paralléliser les expériences légères tout en isolant les graphes les plus gourmands pour éviter les erreurs OOM.

Surtout, les jeux de données réels mélangent trop de propriétés structurelles à la fois. C'est ce constat qui m'a conduit à développer [plekton](/fr/blog/plekton/) en Rust, afin de tester l'élagage d'arêtes sur des graphes synthétiques dont on contrôle séparément l'homophilie, l'hétérogénéité des degrés et le bruit des attributs.
