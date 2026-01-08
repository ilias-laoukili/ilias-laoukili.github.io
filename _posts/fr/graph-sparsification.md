## Mon Projet Tremplin Recherche
J'ai été sélectionné pour le **programme Tremplin Recherche 2025/2026** pour rechercher la **Sparsification de Graphes pour les Réseaux de Neurones sur Graphes (GNNs)**.

Le Problème : L'Oversquashing

Les GNNs souffrent de l'"oversquashing"—un goulot d'étranglement où des quantités exponentielles d'informations provenant de nœuds distants doivent passer par quelques arêtes, compressant et perdant le signal. Les correctifs architecturaux comme l'attention (GAT) ne peuvent pas résoudre ce défaut topologique.

Ma Solution : Restructuration Géométrique

Ma recherche propose de recadrer la sparsification non pas comme une compression, mais comme une intervention géométrique. En utilisant la courbure de Ricci discrète pour identifier les arêtes goulots d'étranglement, nous pouvons chirurgicalement recâbler le graphe pour améliorer le flux d'informations avant que l'apprentissage ne commence. Cela déplace l'accent de l'optimisation guidée par le modèle vers l'optimisation guidée par la géométrie.
