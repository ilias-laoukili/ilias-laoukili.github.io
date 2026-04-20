# synth-graph-rs: Generador de Grafos Sintéticos para Investigación en GNN

El benchmarking de GNN tiene un problema conocido: la mayoría de los conjuntos de datos "estándar" son demasiado pequeños, demasiado limpios y demasiado similares entre sí. Optimizar un modelo sobre Cora o Citeseer significa aprender las peculiaridades de esos grafos específicos, no propiedades generales de los grafos.

**synth-graph-rs** es una herramienta que desarrollé para resolver esto. Genera grafos sintéticos con propiedades precisamente controladas, permitiendo probar el comportamiento de los GNN bajo condiciones exactas.

### ¿Por qué Rust?

La generación de grafos a gran escala está limitada por la CPU y es naturalmente paralelizable. El GIL de Python convierte eso en un cuello de botella. El núcleo Rust maneja la generación sin overhead del GIL y expone bindings Python limpios mediante **PyO3**, manteniendo el resto del pipeline de investigación en Python.

### Modelos de Grafos Soportados

**Stochastic Block Model (SBM)**

El modelo estándar para generación de grafos sintéticos. Los nodos se asignan a comunidades; las aristas se generan con probabilidad `p_in` (dentro de la comunidad) y `p_out` (entre comunidades). Controla directamente la homofilia — variable clave en la investigación moderna de GNN.

**DC-SBM (Degree-Corrected SBM)**

Extiende el SBM con distribuciones de grado heterogéneas. Los grafos reales tienen hubs; el SBM clásico no. El DC-SBM permite introducir heterogeneidad de grado manteniendo la estructura comunitaria.

**cSBM (Contextual SBM)**

Añade features de nodos con una relación señal-ruido controlada. Útil para aislar si un GNN usa estructura, features o ambos.

### Formatos de Salida

- **Arrays NumPy** — matriz de adyacencia + matriz de features, listos para pipelines scikit-learn
- **Objetos PyTorch Geometric `Data`** — compatibles directamente con bucles de entrenamiento PyG
- **JSON** — para almacenamiento, reproducibilidad y configuraciones de benchmark

### Uso en mi Investigación

Desarrollé synth-graph-rs específicamente para mi [investigación sobre esparsificación de grafos](/blog/graph-sparsification). Para probar si los métodos de eliminación de aristas preservan la precisión de los GNN, necesito grafos con niveles de homofilia conocidos y estructura controlada — algo que los conjuntos de datos reales no ofrecen.
