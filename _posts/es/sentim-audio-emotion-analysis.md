# De Formas de Onda a Sentimientos: Conectando el Procesamiento de Señales y el Aprendizaje Profundo

**El sonido es más que ondas—son datos.**

Este proyecto comenzó con una pregunta fundamental: *¿Podemos cuantificar las emociones ocultas dentro de las frecuencias de audio?* Lo que comenzó como una exploración estándar del Procesamiento Digital de Señales (DSP) evolucionó en un sistema capaz de manipular audio y "escuchar" pistas emocionales usando Aprendizaje Automático.

### Fase I: Los Fundamentos (Procesamiento Digital de Señales)

Desarrollado originalmente como proyecto final para el curso "Procesamiento de Señales" bajo el **Profesor [Amadou Assoumane](https://www.linkedin.com/in/amadou-assoumane/)**, el núcleo inicial de esta aplicación era un **Vocoder**. Esta fase se centró en la manipulación matemática de señales de audio en los dominios temporal y frecuencial.

Algunas funcionalidades clave de DSP incluyeron:

- **Estiramiento Temporal:** Implementación de algoritmos (como Phase Vocoder) para ralentizar la reproducción de audio sin distorsionar el tono.
- **Cambio de Tono:** Alterar la clave de la entrada de audio mientras se mantiene la velocidad original.
- **Robotización:** Aplicación de efectos de Modulación en Anillo para crear texturas vocales metálicas y robóticas.

### Fase II: La Capa Inteligente (Aprendizaje Automático)

Para cerrar la brecha entre la manipulación bruta de señales y la comprensión semántica, integré un motor de reconocimiento de emociones. Usando el conjunto de datos **RAVDESS** (Ryerson Audio-Visual Database of Emotional Speech and Song), construí un pipeline para clasificar emociones como Alegría, Ira, Tristeza y Neutralidad.

El sistema extrae características acústicas críticas—específicamente **MFCCs (coeficientes cepstrales en escala Mel)** y **Contraste Espectral**—para alimentar un **Clasificador Random Forest**. Este modelo logró alta precisión, superando significativamente las líneas base heurísticas y demostrando que los estados emocionales tienen huellas espectrales cuantificables.

### Fase III: La Actualización de Aprendizaje Profundo

El proyecto recibió su evolución final durante el curso "Aprendizaje Profundo" con el **Profesor Giovanni Chierchia**. Más allá del ML tradicional, implementé dos **Redes Neuronales** distintas para refinar aún más las capacidades de clasificación y explorar relaciones de características no lineales.

### Stack Técnico

- **Núcleo:** Python, NumPy, SciPy
- **Procesamiento de Audio:** Librosa
- **Aprendizaje Automático:** Scikit-learn (Random Forest)
- **Aprendizaje Profundo:** PyTorch (Redes Neuronales)

###

### Agradecimientos y Créditos

Este proyecto fue desarrollado como parte de mis estudios en **ESIEE Paris** y conecta múltiples disciplinas. Me gustaría expresar mi sincero agradecimiento a los miembros del cuerpo docente cuya experiencia guió la evolución de este trabajo.

**Procesamiento Digital de Señales (Fase I)**

- **Prof. [Olivier Français](https://www.linkedin.com/in/olivier-fran%C3%A7ais-171a5851/)** *Decano de la Facultad en ESIEE Paris, ESYCOM, UMR 9007 CNRS / Université Gustave Eiffel* Por su invaluable orientación y experiencia en Procesamiento Digital de Señales.
- **Prof. E. [Veronica Belmega](https://www.linkedin.com/in/e-veronica-belmega-0844262a/)** *Profesora de Informática y Sistemas de Telecomunicaciones, Université Gustave Eiffel (UGE), CNRS, LIGM* Por su instrucción experta y apoyo académico.
- **Prof. [Amadou Assoumane](https://www.linkedin.com/in/amadou-assoumane/)** Por su mentoría y apoyo constante durante todo el desarrollo inicial.

**Aprendizaje Profundo e IA (Fase II)**

- **Prof. [Giovanni Chierchia](https://perso.esiee.fr/~chierchg/)** *Laboratoire d'Informatique Gaspard Monge (LIGM), Université Gustave Eiffel, ESIEE Paris* Por su orientación durante el curso "Aprendizaje Profundo", que fue fundamental para integrar las arquitecturas de redes neuronales en este proyecto.
