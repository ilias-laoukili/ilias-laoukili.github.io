# From Waveforms to Feelings: Bridging Signal Processing and Deep Learning

**Sound is more than just waves—it’s data.**

This project began with a fundamental question: *Can we quantify the emotions hidden within audio frequencies?* What started as a standard exploration of Digital Signal Processing (DSP) evolved into a a system capable of manipulating audio and "listening" for emotional cues using Machine Learning.

### Phase I: The Foundation (Digital Signal Processing)

Originally developed as a capstone assignment for the "Signal Processing" course under **Professor&#32;[Amadou Assoumane](https://www.linkedin.com/in/amadou-assoumane/)**, the initial core of this application was a **Vocoder**. This phase focused on the mathematical manipulation of audio signals in the time and frequency domains.

Some key DSP functionalities included:

- **Time-Stretching:** Implementing algorithms (such as Phase Vocoder) to slow down audio playback without distorting the pitch.
- **Pitch-Shifting:** Altering the key of the audio input while maintaining the original speed.
- **Robotization:** Applying Ring Modulation effects to create metallic, robotic vocal textures.

### Phase II: The Intelligent Layer (Machine Learning)

To bridge the gap between raw signal manipulation and semantic understanding, I integrated an emotion recognition engine. Using the **RAVDESS** (Ryerson Audio-Visual Database of Emotional Speech and Song) dataset, I built a pipeline to classify emotions such as Joy, Anger, Sadness, and Neutrality.

The system extracts critical acoustic features—specifically **MFCCs (Mel-frequency cepstral coefficients)** and **Spectral Contrast**—to feed into a **Random Forest Classifier**. This model achieved high accuracy, significantly outperforming heuristic baselines and proving that emotional states have quantifiable spectral fingerprints.

### Phase III: The Deep Learning Upgrade

The project received its final evolution during the "Deep Learning" course with **Professor Giovanni Chierchia**. Moving beyond traditional ML, I implemented two distinct **Neural Networks** to further refine the classification capabilities and explore non-linear feature relationships.

### Technical Stack

- **Core:** Python, NumPy, SciPy
- **Audio Processing:** Librosa
- **Machine Learning:** Scikit-learn (Random Forest)
- **Deep Learning:** PyTorch (Neural Networks)

### 

### Acknowledgments & Credits

This project was developed as part of my studies at **ESIEE Paris** and bridges multiple disciplines. I would like to express my sincere gratitude to the faculty members whose expertise guided the evolution of this work.

**Digital Signal Processing (Phase I)**

- **Prof.&#32;[Olivier Français](https://www.linkedin.com/in/olivier-fran%C3%A7ais-171a5851/)** *Dean of the Faculty at ESIEE Paris, ESYCOM, UMR 9007 CNRS / Université Gustave Eiffel* For his invaluable guidance and expertise in Digital Signal Processing.
- **Prof. E.&#32;[Veronica Belmega](https://www.linkedin.com/in/e-veronica-belmega-0844262a/)** *Professor in Computer Science and Telecommunication Systems, Université Gustave Eiffel (UGE), CNRS, LIGM* For her expert instruction and academic support.
- **Prof.&#32;[Amadou Assoumane](https://www.linkedin.com/in/amadou-assoumane/)** For his mentorship and consistent support throughout the initial development.

**Deep Learning & AI (Phase II)**

- **Prof.&#32;[Giovanni Chierchia](https://perso.esiee.fr/~chierchg/)** *Laboratoire d'Informatique Gaspard Monge (LIGM), Université Gustave Eiffel, ESIEE Paris* For his guidance during the "Deep Learning" course, which was instrumental in integrating the neural network architectures into this project.