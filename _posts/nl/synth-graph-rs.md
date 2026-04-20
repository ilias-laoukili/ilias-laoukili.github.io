# synth-graph-rs: Synthetische Graafgenerator voor GNN-onderzoek

GNN-benchmarking kent een bekend probleem: de meeste "standaard" datasets zijn te klein, te schoon en te gelijkaardig. Een model optimaliseren op Cora of Citeseer betekent de eigenaardigheid van die specifieke grafen leren kennen — niet de algemene eigenschappen van grafen.

**synth-graph-rs** is een tool die ik ontwikkelde om dit op te lossen. Het genereert synthetische grafen met nauwkeurig gecontroleerde eigenschappen, zodat GNN-gedrag onder exacte omstandigheden getest kan worden.

### Waarom Rust?

Graafgeneratie op grote schaal is CPU-gebonden en natuurlijk paralleliseerbaar. Pythons GIL maakt dat een knelpunt. De Rust-kern verwerkt de generatie zonder GIL-overhead en biedt schone Python-bindings via **PyO3**, zodat de rest van de onderzoekspijplijn in Python blijft.

### Ondersteunde Graafmodellen

**Stochastic Block Model (SBM)**

Het standaardmodel voor synthetische graafgeneratie. Knopen worden aan gemeenschappen toegewezen; kanten worden getrokken met kans `p_in` (binnen gemeenschap) en `p_out` (tussen gemeenschappen). Beheert homofilie direct — de sleutelvariabele in modern GNN-onderzoek.

**Degree-Corrected SBM (DC-SBM)**

Breidt SBM uit met heterogene graadverdelingen. Echte grafen hebben hubs; klassiek SBM niet. DC-SBM laat graad-heterogeniteit toe met behoud van gemeenschapsstructuur.

**Contextual SBM (cSBM)**

Voegt knoopfeatures toe met een gecontroleerde signaal-ruisverhouding. Nuttig om te isoleren of een GNN structuur, features of beide gebruikt.

### Uitvoerformaten

- **NumPy-arrays** — aangrenzendheidsmatrix + featurematrix, klaar voor scikit-learn-pijplijnen
- **PyTorch Geometric `Data`-objecten** — direct compatibel met PyG-trainingslussen
- **JSON** — voor opslag, reproduceerbaarheid en benchmarkconfiguraties

### Gebruik in mijn Onderzoek

Ik ontwikkelde synth-graph-rs specifiek voor mijn [onderzoek naar graafverdunning](/blog/graph-sparsification). Om te testen of kantverwijderingsmethoden de GNN-nauwkeurigheid bewaren, heb ik grafen nodig met bekende homofilie-niveaus en gecontroleerde structuur — iets wat echte datasets niet bieden.
