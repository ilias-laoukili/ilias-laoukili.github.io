## Présentation

Sentim a commencé comme un projet de traitement du signal à **ESIEE Paris** — un vocodeur Python agissant directement sur le signal audio — avant d'évoluer vers une application de reconnaissance d'émotions vocales entraînée sur **RAVDESS** (8 classes d'émotions) et déployée avec Streamlit.

## Partie 1 : traitement du signal et vocodeur

La première version portait sur la manipulation temporelle et fréquentielle du signal avec NumPy, SciPy et Librosa :

- **Étirement temporel** par vocodeur de phase pour ralentir ou accélérer un enregistrement sans modifier la hauteur.
- **Transposition (pitch-shifting)** pour changer la hauteur de la voix à durée constante.
- **Modulation en anneau** pour produire un timbre métallique/robotique.

## Partie 2 : des descripteurs DSP aux spectrogrammes 2D

Pour classer les 8 émotions du jeu de données RAVDESS (neutre, calme, joie, tristesse, colère, peur, dégoût, surprise), j'ai d'abord extrait des descripteurs acoustiques classiques — **MFCC**, **Chroma**, **Tonnetz** et **contraste spectral** — afin d'entraîner une baseline **Random Forest** avec Scikit-learn.

Dans le cadre du cours de Deep Learning, j'ai remplacé ces statistiques agrégées par des **spectrogrammes Mel 2D** en entrée de deux modèles PyTorch : un **CNN** compact à 2 couches conçu de zéro et un **ResNet** affiné. Les deux modèles sur spectrogrammes dépassent la baseline Random Forest en exploitant la dynamique temps-fréquence perdue lors de l'agrégation globale.

## Interface et outils

L'interface Streamlit permet de charger un extrait audio, d'appliquer les effets DSP, de visualiser la forme d'onde et le spectrogramme Mel, et d'observer les probabilités prédites par émotion.

- **Audio et DSP :** Python, NumPy, SciPy, Librosa
- **ML et Deep Learning :** Scikit-learn (Random Forest), PyTorch (CNN, ResNet)
- **Application :** Streamlit

## Remerciements

Ce projet a été réalisé à **ESIEE Paris** dans le cadre des cours de traitement du signal et de Deep Learning, encadrés par :

- **Prof. [Olivier Français](https://www.linkedin.com/in/olivier-fran%C3%A7ais-171a5851/)** — ESIEE Paris, ESYCOM (UMR 9007 CNRS / Université Gustave Eiffel)
- **Prof. E. [Veronica Belmega](https://www.linkedin.com/in/e-veronica-belmega-0844262a/)** — Université Gustave Eiffel, CNRS, LIGM
- **Prof. [Amadou Assoumane](https://www.linkedin.com/in/amadou-assoumane/)** — encadrement en traitement du signal
- **Prof. [Giovanni Chierchia](https://perso.esiee.fr/~chierchg/)** — encadrement en Deep Learning, LIGM / ESIEE Paris
