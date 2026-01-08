## Décoder le Son
Le son est plus que des ondes—ce sont des données. Ce projet relie le Traitement Numérique du Signal (DSP) et l'Apprentissage Automatique pour répondre à : *Peut-on quantifier les émotions ?*

Le Terrain de Jeu DSP

Un Vocoder personnalisé construit avec librosa et scipy permettant :

    Étirement Temporel : Ralentir l'audio sans distorsion de hauteur.

    Changement de Hauteur : Changer la tonalité sans modifier la vitesse.

    Robotisation : Effets de modulation en anneau.

Analyse des Émotions

En utilisant le dataset RAVDESS, j'ai entraîné un Classificateur Random Forest. L'application extrait des caractéristiques acoustiques (MFCCs, contraste spectral) pour prédire des émotions comme la Joie, la Colère, la Tristesse ou Neutre avec une haute précision comparée aux baselines heuristiques.
