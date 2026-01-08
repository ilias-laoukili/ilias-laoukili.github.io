## Aperçu du Projet : Dravion
En réponse à la menace croissante des incendies de forêt, le projet "Dravion" intègre un système logiciel spécialisé pour la surveillance environnementale en temps réel.

Implémentation Technique

Le projet utilise un script Python dédié, fire_detection.py. Contrairement au module de détection de personnes, celui-ci ne repose pas sur l'IA mais emploie la conversion classique de l'espace colorimétrique HSV et le masquage pour identifier les "foyers lumineux" typiques des flammes.

Processus de Détection

    Conversion : Espace colorimétrique RGB vers HSV.

    Masquage : Application de masques centrés sur les teintes rouge, orange et jaune.

    Seuillage : Filtrage du bruit ; seules les zones >500px sont signalées.

Sortie

Les feux détectés sont encadrés par un rectangle, et les coordonnées sont transmises au format JSON à l'interface principale pour une superposition vidéo en temps réel.
