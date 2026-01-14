# Von Wellenformen zu Gefühlen: Signalverarbeitung und Deep Learning verbinden

**Klang ist mehr als nur Wellen—es sind Daten.**

Dieses Projekt begann mit einer fundamentalen Frage: *Können wir die in Audiofrequenzen verborgenen Emotionen quantifizieren?* Was als standardmäßige Erkundung der digitalen Signalverarbeitung (DSP) begann, entwickelte sich zu einem System, das Audio manipulieren und mittels maschinellem Lernen auf emotionale Hinweise „hören" kann.

### Phase I: Die Grundlage (Digitale Signalverarbeitung)

Ursprünglich als Abschlussprojekt für den Kurs „Signalverarbeitung" unter **Professor [Amadou Assoumane](https://www.linkedin.com/in/amadou-assoumane/)** entwickelt, war der anfängliche Kern dieser Anwendung ein **Vocoder**. Diese Phase konzentrierte sich auf die mathematische Manipulation von Audiosignalen im Zeit- und Frequenzbereich.

Einige wichtige DSP-Funktionalitäten umfassten:

- **Zeitdehnung:** Implementierung von Algorithmen (wie Phase Vocoder), um die Audiowiedergabe zu verlangsamen, ohne die Tonhöhe zu verzerren.
- **Tonhöhenverschiebung:** Änderung der Tonart der Audioeingabe bei Beibehaltung der ursprünglichen Geschwindigkeit.
- **Robotisierung:** Anwendung von Ringmodulationseffekten zur Erzeugung metallischer, robotischer Stimmentexturen.

### Phase II: Die intelligente Schicht (Maschinelles Lernen)

Um die Lücke zwischen roher Signalmanipulation und semantischem Verständnis zu schließen, integrierte ich eine Emotionserkennungs-Engine. Mit dem **RAVDESS** (Ryerson Audio-Visual Database of Emotional Speech and Song) Datensatz baute ich eine Pipeline zur Klassifizierung von Emotionen wie Freude, Wut, Traurigkeit und Neutralität.

Das System extrahiert kritische akustische Merkmale—speziell **MFCCs (Mel-Frequenz-Cepstral-Koeffizienten)** und **spektralen Kontrast**—um einen **Random Forest Classifier** zu speisen. Dieses Modell erreichte hohe Genauigkeit, übertraf heuristische Baselines deutlich und bewies, dass emotionale Zustände quantifizierbare spektrale Fingerabdrücke haben.

### Phase III: Das Deep Learning Upgrade

Das Projekt erhielt seine endgültige Entwicklung während des Kurses „Deep Learning" bei **Professor Giovanni Chierchia**. Über traditionelles ML hinausgehend implementierte ich zwei unterschiedliche **neuronale Netze**, um die Klassifizierungsfähigkeiten weiter zu verfeinern und nichtlineare Merkmalsbeziehungen zu erforschen.

### Technischer Stack

- **Kern:** Python, NumPy, SciPy
- **Audioverarbeitung:** Librosa
- **Maschinelles Lernen:** Scikit-learn (Random Forest)
- **Deep Learning:** PyTorch (Neuronale Netze)

###

### Danksagungen & Credits

Dieses Projekt wurde im Rahmen meines Studiums an der **ESIEE Paris** entwickelt und verbindet mehrere Disziplinen. Ich möchte den Fakultätsmitgliedern, deren Expertise die Entwicklung dieser Arbeit geleitet hat, meinen aufrichtigen Dank aussprechen.

**Digitale Signalverarbeitung (Phase I)**

- **Prof. [Olivier Français](https://www.linkedin.com/in/olivier-fran%C3%A7ais-171a5851/)** *Dekan der Fakultät an der ESIEE Paris, ESYCOM, UMR 9007 CNRS / Université Gustave Eiffel* Für seine unschätzbare Anleitung und Expertise in der digitalen Signalverarbeitung.
- **Prof. E. [Veronica Belmega](https://www.linkedin.com/in/e-veronica-belmega-0844262a/)** *Professorin für Informatik und Telekommunikationssysteme, Université Gustave Eiffel (UGE), CNRS, LIGM* Für ihren fachkundigen Unterricht und akademische Unterstützung.
- **Prof. [Amadou Assoumane](https://www.linkedin.com/in/amadou-assoumane/)** Für seine Betreuung und kontinuierliche Unterstützung während der gesamten anfänglichen Entwicklung.

**Deep Learning & KI (Phase II)**

- **Prof. [Giovanni Chierchia](https://perso.esiee.fr/~chierchg/)** *Laboratoire d'Informatique Gaspard Monge (LIGM), Université Gustave Eiffel, ESIEE Paris* Für seine Anleitung während des Kurses „Deep Learning", die maßgeblich für die Integration der neuronalen Netzarchitekturen in dieses Projekt war.
