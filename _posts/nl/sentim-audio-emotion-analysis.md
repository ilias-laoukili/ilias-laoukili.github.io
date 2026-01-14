# Van Golfvormen naar Gevoelens: Signaalverwerking en Deep Learning Verbinden

**Geluid is meer dan alleen golven—het zijn data.**

Dit project begon met een fundamentele vraag: *Kunnen we de emoties die verborgen zijn in audiofrequenties kwantificeren?* Wat begon als een standaard verkenning van Digitale Signaalverwerking (DSP) evolueerde naar een systeem dat audio kan manipuleren en "luisteren" naar emotionele aanwijzingen met behulp van Machine Learning.

### Fase I: De Basis (Digitale Signaalverwerking)

Oorspronkelijk ontwikkeld als afstudeerproject voor de cursus "Signaalverwerking" onder **Professor [Amadou Assoumane](https://www.linkedin.com/in/amadou-assoumane/)**, was de initiële kern van deze applicatie een **Vocoder**. Deze fase richtte zich op de wiskundige manipulatie van audiosignalen in de tijd- en frequentiedomeinen.

Enkele belangrijke DSP-functionaliteiten omvatten:

- **Tijdrekking:** Implementatie van algoritmen (zoals Phase Vocoder) om audio-afspelen te vertragen zonder de toonhoogte te vervormen.
- **Toonhoogteverschuiving:** Het wijzigen van de toonsoort van de audio-invoer terwijl de oorspronkelijke snelheid behouden blijft.
- **Robotisering:** Toepassing van ringmodulatie-effecten om metaalachtige, robotachtige vocale texturen te creëren.

### Fase II: De Intelligente Laag (Machine Learning)

Om de kloof tussen ruwe signaalmanipulatie en semantisch begrip te overbruggen, integreerde ik een emotieherkenningsengine. Met behulp van de **RAVDESS** (Ryerson Audio-Visual Database of Emotional Speech and Song) dataset bouwde ik een pipeline om emoties te classificeren zoals Vreugde, Woede, Verdriet en Neutraliteit.

Het systeem extraheert kritieke akoestische kenmerken—specifiek **MFCCs (Mel-frequentie cepstrale coëfficiënten)** en **Spectraal Contrast**—om een **Random Forest Classifier** te voeden. Dit model behaalde hoge nauwkeurigheid, presteerde aanzienlijk beter dan heuristische baselines en bewees dat emotionele toestanden kwantificeerbare spectrale vingerafdrukken hebben.

### Fase III: De Deep Learning Upgrade

Het project kreeg zijn definitieve evolutie tijdens de cursus "Deep Learning" bij **Professor Giovanni Chierchia**. Voorbij traditionele ML implementeerde ik twee verschillende **Neurale Netwerken** om de classificatiemogelijkheden verder te verfijnen en niet-lineaire kenmerkrelaties te verkennen.

### Technische Stack

- **Kern:** Python, NumPy, SciPy
- **Audioverwerking:** Librosa
- **Machine Learning:** Scikit-learn (Random Forest)
- **Deep Learning:** PyTorch (Neurale Netwerken)

###

### Dankbetuigingen & Credits

Dit project werd ontwikkeld als onderdeel van mijn studie aan **ESIEE Paris** en verbindt meerdere disciplines. Ik wil mijn oprechte dankbaarheid uitspreken aan de faculteitsleden wier expertise de evolutie van dit werk heeft geleid.

**Digitale Signaalverwerking (Fase I)**

- **Prof. [Olivier Français](https://www.linkedin.com/in/olivier-fran%C3%A7ais-171a5851/)** *Decaan van de Faculteit aan ESIEE Paris, ESYCOM, UMR 9007 CNRS / Université Gustave Eiffel* Voor zijn onschatbare begeleiding en expertise in Digitale Signaalverwerking.
- **Prof. E. [Veronica Belmega](https://www.linkedin.com/in/e-veronica-belmega-0844262a/)** *Hoogleraar Informatica en Telecommunicatiesystemen, Université Gustave Eiffel (UGE), CNRS, LIGM* Voor haar deskundige instructie en academische ondersteuning.
- **Prof. [Amadou Assoumane](https://www.linkedin.com/in/amadou-assoumane/)** Voor zijn mentorschap en consistente ondersteuning gedurende de gehele initiële ontwikkeling.

**Deep Learning & AI (Fase II)**

- **Prof. [Giovanni Chierchia](https://perso.esiee.fr/~chierchg/)** *Laboratoire d'Informatique Gaspard Monge (LIGM), Université Gustave Eiffel, ESIEE Paris* Voor zijn begeleiding tijdens de cursus "Deep Learning", wat instrumenteel was in het integreren van de neurale netwerkarchitecturen in dit project.
