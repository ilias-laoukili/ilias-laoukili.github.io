## Resumen del Proyecto: Dravion
En respuesta a la creciente amenaza de incendios forestales, el proyecto "Dravion" integra un sistema de software especializado para la vigilancia ambiental en tiempo real.

Implementación Técnica

El proyecto utiliza un script Python dedicado, fire_detection.py. A diferencia del módulo de detección de personas, este no depende de IA sino que emplea la conversión clásica del espacio de color HSV y enmascaramiento para identificar "foyers lumineux" (puntos calientes brillantes) típicos de las llamas.

Proceso de Detección

    Conversión: Espacio de color RGB a HSV.

    Enmascaramiento: Aplicación de máscaras centradas en tonos rojos, naranjas y amarillos.

    Umbralización: Filtrado de ruido; solo se marcan áreas >500px.

Salida

Los incendios detectados se enmarcan con un rectángulo, y las coordenadas se transmiten en formato JSON a la interfaz principal para la superposición de video en tiempo real.
