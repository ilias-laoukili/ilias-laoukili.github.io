## Geluid Ontcijferen
Geluid is meer dan alleen golven—het zijn data. Dit project verbindt Digitale Signaalverwerking (DSP) en Machine Learning om te beantwoorden: *Kunnen we emoties kwantificeren?*

De DSP Speeltuin

Een aangepaste Vocoder gebouwd met librosa en scipy die mogelijk maakt:

    Tijdrekking: Audio vertragen zonder toonhoogtevervorming.

    Toonhoogteverschuiving: Toonsoort veranderen zonder snelheid te wijzigen.

    Robotisering: Ringmodulatie-effecten.

Emotieanalyse

Met de RAVDESS-dataset heb ik een Random Forest Classifier getraind. De app extraheert akoestische kenmerken (MFCCs, spectraal contrast) om emoties zoals Vreugde, Woede, Verdriet of Neutraal met hoge nauwkeurigheid te voorspellen vergeleken met heuristische baselines.
