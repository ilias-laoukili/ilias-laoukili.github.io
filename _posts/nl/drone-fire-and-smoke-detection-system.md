## Projectoverzicht: Dravion
Als reactie op de groeiende dreiging van bosbranden integreert het "Dravion"-project een gespecialiseerd softwaresysteem voor real-time milieubewaking.

Technische Implementatie

Het project maakt gebruik van een dedicated Python-script, fire_detection.py. In tegenstelling tot de persoondetectiemodule is deze niet afhankelijk van AI maar gebruikt klassieke HSV-kleurruimteconversie en maskering om "foyers lumineux" (heldere hotspots) te identificeren die typisch zijn voor vlammen.

Detectieproces

    Conversie: RGB naar HSV-kleurruimte.

    Maskering: Toepassing van maskers gecentreerd op rode, oranje en gele tinten.

    Drempelwaarde: Ruis uitfilteren; alleen gebieden >500px worden gemarkeerd.

Output

Gedetecteerde branden worden omlijst met een rechthoek, en coördinaten worden in JSON-formaat verzonden naar de hoofdinterface voor real-time video-overlay.
