## Decodificando el Sonido
El sonido es más que ondas—son datos. Este proyecto conecta el Procesamiento Digital de Señales (DSP) y el Aprendizaje Automático para responder: *¿Podemos cuantificar las emociones?*

El Playground de DSP

Un Vocoder personalizado construido con librosa y scipy que permite:

    Estiramiento Temporal: Ralentizar audio sin distorsión de tono.

    Cambio de Tono: Cambiar la tonalidad sin alterar la velocidad.

    Robotización: Efectos de modulación en anillo.

Análisis de Emociones

Usando el dataset RAVDESS, entrené un Clasificador Random Forest. La aplicación extrae características acústicas (MFCCs, contraste espectral) para predecir emociones como Alegría, Ira, Tristeza o Neutral con alta precisión comparada con baselines heurísticas.
