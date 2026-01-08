## Mi Proyecto Tremplin Recherche
He sido seleccionado para el **programa Tremplin Recherche 2025/2026** para investigar **Graph Sparsification para Graph Neural Networks (GNNs)**.

El Problema: Oversquashing

Las GNNs luchan con el "oversquashing": un cuello de botella donde cantidades exponenciales de información de nodos distantes deben pasar a través de pocas aristas, comprimiendo y perdiendo señal. Las soluciones arquitectónicas como attention (GAT) no pueden resolver este defecto topológico.

Mi Solución: Reestructuración Geométrica

Mi investigación propone reformular la sparsification no como compresión, sino como intervención geométrica. Usando la curvatura de Ricci discreta para identificar aristas cuello de botella, podemos reconectar quirúrgicamente el grafo para mejorar el flujo de información antes de que comience el aprendizaje. Esto cambia el enfoque de optimización guiada por modelo a optimización guiada por geometría.
