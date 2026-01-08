## Mein Tremplin Recherche Projekt
Ich wurde für das **Tremplin Recherche 2025/2026 Programm** ausgewählt, um **Graph Sparsification für Graph Neural Networks (GNNs)** zu erforschen.

Das Problem: Oversquashing

GNNs kämpfen mit "Oversquashing" - einem Engpass, bei dem exponentielle Informationsmengen von entfernten Knoten durch wenige Kanten passieren müssen, wobei das Signal komprimiert wird und verloren geht. Architektonische Lösungen wie Attention (GAT) können diesen topologischen Fehler nicht beheben.

Meine Lösung: Geometrische Umstrukturierung

Meine Forschung schlägt vor, Sparsification nicht als Kompression, sondern als geometrische Intervention neu zu definieren. Durch die Verwendung diskreter Ricci-Krümmung zur Identifizierung von Engpass-Kanten können wir den Graphen chirurgisch umverdrahten, um den Informationsfluss zu verbessern, bevor das Lernen beginnt. Dies verschiebt den Fokus von modellgetriebener zu geometriegetriebener Optimierung.
