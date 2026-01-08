## Klang entschlüsseln
Klang ist mehr als nur Wellen - es sind Daten. Dieses Projekt verbindet digitale Signalverarbeitung (DSP) und maschinelles Lernen, um zu beantworten: *Können wir Emotionen quantifizieren?*

Der DSP-Spielplatz

Ein maßgeschneiderter Vocoder, erstellt mit librosa und scipy, ermöglicht:

    Zeitdehnung: Audio verlangsamen ohne Tonhöhenverzerrung.

    Tonhöhenverschiebung: Tonart ändern ohne Geschwindigkeitsänderung.

    Robotisierung: Ringmodulationseffekte.

Emotionsanalyse

Mit dem RAVDESS-Datensatz habe ich einen Random Forest Classifier trainiert. Die App extrahiert akustische Merkmale (MFCCs, spektralen Kontrast), um Emotionen wie Freude, Wut, Traurigkeit oder Neutral mit hoher Genauigkeit im Vergleich zu heuristischen Baselines vorherzusagen.
