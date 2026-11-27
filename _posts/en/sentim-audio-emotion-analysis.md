## Overview

Sentim started as a Signal Processing assignment at **ESIEE Paris**—a Python vocoder manipulating raw audio waveforms—and grew into a speech emotion recognition application trained on **RAVDESS** (8 emotion classes), deployed as an interactive Streamlit app.

## Part 1: Signal processing and vocoder

The first version focused on time- and frequency-domain audio manipulation built with NumPy, SciPy, and Librosa:

- **Time-stretching** via a phase vocoder to change playback speed without shifting pitch.
- **Pitch-shifting** to transpose the voice while keeping original duration.
- **Ring modulation** for metallic/robotic vocal synthesis.

## Part 2: From tabular DSP features to 2D spectrograms

To classify the 8 emotional states in RAVDESS (neutral, calm, happy, sad, angry, fearful, disgust, surprised), I first extracted handcrafted acoustic features—**MFCCs**, **Chroma**, **Tonnetz**, and **Spectral Contrast**—and trained a **Random Forest** classifier in Scikit-learn as a fast baseline.

For the Deep Learning course, I replaced handcrafted summary statistics with full **2D Mel-spectrograms** fed into two PyTorch architectures: a compact 2-layer **CNN** built from scratch and a fine-tuned **ResNet**. Both spectrogram models outperformed the Random Forest baseline by capturing temporal-spectral patterns lost when averaging features over an entire utterance.

## Interface and stack

The Streamlit dashboard lets users record or upload a clip, apply DSP transformations, inspect the waveform and Mel-spectrogram, and view per-class emotion probabilities in real time.

- **Audio & DSP:** Python, NumPy, SciPy, Librosa
- **ML & Deep Learning:** Scikit-learn (Random Forest), PyTorch (CNN, ResNet)
- **App:** Streamlit

## Acknowledgments

This work was developed at **ESIEE Paris** across the Signal Processing and Deep Learning courses, with supervision from:

- **Prof. [Olivier Français](https://www.linkedin.com/in/olivier-fran%C3%A7ais-171a5851/)** — ESIEE Paris, ESYCOM (UMR 9007 CNRS / Université Gustave Eiffel)
- **Prof. E. [Veronica Belmega](https://www.linkedin.com/in/e-veronica-belmega-0844262a/)** — Université Gustave Eiffel, CNRS, LIGM
- **Prof. [Amadou Assoumane](https://www.linkedin.com/in/amadou-assoumane/)** — Signal Processing supervision
- **Prof. [Giovanni Chierchia](https://perso.esiee.fr/~chierchg/)** — Deep Learning supervision, LIGM / ESIEE Paris
