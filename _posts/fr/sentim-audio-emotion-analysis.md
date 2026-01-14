# Des Formes d'Onde aux Sentiments : Relier le Traitement du Signal et l'Apprentissage Profond

**Le son est plus que de simples ondes—ce sont des données.**

Ce projet a commencé par une question fondamentale : *Peut-on quantifier les émotions cachées dans les fréquences audio ?* Ce qui a commencé comme une exploration standard du Traitement Numérique du Signal (DSP) a évolué en un système capable de manipuler l'audio et « d'écouter » les indices émotionnels en utilisant l'Apprentissage Automatique.

### Phase I : Les Fondations (Traitement Numérique du Signal)

Développé à l'origine comme projet de fin d'études pour le cours « Traitement du Signal » sous la direction du **Professeur [Amadou Assoumane](https://www.linkedin.com/in/amadou-assoumane/)**, le noyau initial de cette application était un **Vocoder**. Cette phase s'est concentrée sur la manipulation mathématique des signaux audio dans les domaines temporel et fréquentiel.

Quelques fonctionnalités DSP clés comprenaient :

- **Étirement Temporel :** Mise en œuvre d'algorithmes (tels que le Vocoder de Phase) pour ralentir la lecture audio sans distordre la hauteur.
- **Changement de Hauteur :** Modifier la tonalité de l'entrée audio tout en maintenant la vitesse d'origine.
- **Robotisation :** Application d'effets de modulation en anneau pour créer des textures vocales métalliques et robotiques.

### Phase II : La Couche Intelligente (Apprentissage Automatique)

Pour combler le fossé entre la manipulation brute du signal et la compréhension sémantique, j'ai intégré un moteur de reconnaissance des émotions. En utilisant le jeu de données **RAVDESS** (Ryerson Audio-Visual Database of Emotional Speech and Song), j'ai construit un pipeline pour classifier des émotions telles que la Joie, la Colère, la Tristesse et la Neutralité.

Le système extrait des caractéristiques acoustiques critiques—spécifiquement les **MFCCs (coefficients cepstraux en échelle Mel)** et le **Contraste Spectral**—pour alimenter un **Classificateur Random Forest**. Ce modèle a atteint une grande précision, surpassant significativement les baselines heuristiques et prouvant que les états émotionnels possèdent des empreintes spectrales quantifiables.

### Phase III : La Mise à Niveau avec l'Apprentissage Profond

Le projet a reçu son évolution finale lors du cours « Apprentissage Profond » avec le **Professeur Giovanni Chierchia**. Au-delà de l'apprentissage automatique traditionnel, j'ai implémenté deux **Réseaux de Neurones** distincts pour affiner davantage les capacités de classification et explorer les relations de caractéristiques non linéaires.

### Stack Technique

- **Noyau :** Python, NumPy, SciPy
- **Traitement Audio :** Librosa
- **Apprentissage Automatique :** Scikit-learn (Random Forest)
- **Apprentissage Profond :** PyTorch (Réseaux de Neurones)

###

### Remerciements et Crédits

Ce projet a été développé dans le cadre de mes études à **ESIEE Paris** et relie plusieurs disciplines. Je souhaite exprimer ma sincère gratitude aux membres du corps professoral dont l'expertise a guidé l'évolution de ce travail.

**Traitement Numérique du Signal (Phase I)**

- **Prof. [Olivier Français](https://www.linkedin.com/in/olivier-fran%C3%A7ais-171a5851/)** *Doyen de la Faculté à ESIEE Paris, ESYCOM, UMR 9007 CNRS / Université Gustave Eiffel* Pour ses précieux conseils et son expertise en Traitement Numérique du Signal.
- **Prof. E. [Veronica Belmega](https://www.linkedin.com/in/e-veronica-belmega-0844262a/)** *Professeure en Informatique et Systèmes de Télécommunications, Université Gustave Eiffel (UGE), CNRS, LIGM* Pour son enseignement expert et son soutien académique.
- **Prof. [Amadou Assoumane](https://www.linkedin.com/in/amadou-assoumane/)** Pour son mentorat et son soutien constant tout au long du développement initial.

**Apprentissage Profond & IA (Phase II)**

- **Prof. [Giovanni Chierchia](https://perso.esiee.fr/~chierchg/)** *Laboratoire d'Informatique Gaspard Monge (LIGM), Université Gustave Eiffel, ESIEE Paris* Pour ses conseils lors du cours « Apprentissage Profond », qui ont été déterminants pour intégrer les architectures de réseaux de neurones dans ce projet.
