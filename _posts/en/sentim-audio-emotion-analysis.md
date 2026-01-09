## Decoding Sound
Sound is more than just waves—it’s data. This project bridges Digital Signal Processing (DSP) and Machine Learning to answer: *Can we quantify emotion?*

The DSP Playground

A custom Vocoder built with librosa and scipy allowing:

    Time-Stretching: Slowing audio without pitch distortion.

    Pitch-Shifting: Changing key without altering speed.

    Robotization: Ring modulation effects.

Emotion Analysis

Using the RAVDESS dataset, I trained a Random Forest Classifier. The app extracts acoustic features (MFCCs, spectral contrast) to predict emotions like Joy, Anger, Sadness, or Neutral with high accuracy compared to heuristic baselines.