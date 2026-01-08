## Projektübersicht: Dravion
Als Reaktion auf die wachsende Bedrohung durch Waldbrände integriert das Projekt "Dravion" ein spezialisiertes Softwaresystem für die Umweltüberwachung in Echtzeit.

Technische Umsetzung

Das Projekt verwendet ein dediziertes Python-Skript, fire_detection.py. Im Gegensatz zum Personenerkennungsmodul basiert dieses nicht auf KI, sondern nutzt klassische HSV-Farbraumkonvertierung und Maskierung, um "foyers lumineux" (helle Hotspots) zu identifizieren, die typisch für Flammen sind.

Erkennungsprozess

    Konvertierung: RGB zu HSV-Farbraum.

    Maskierung: Anwendung von Masken, die auf rote, orange und gelbe Farbtöne zentriert sind.

    Schwellenwertbildung: Rauschen herausfiltern; nur Bereiche >500px werden markiert.

Ausgabe

Erkannte Brände werden mit einem Rechteck umrahmt, und die Koordinaten werden im JSON-Format an die Hauptoberfläche für die Echtzeit-Videoüberlagerung übertragen.
