# Volcano-k8s :volcano:

Démonstration Kubernetes avec une application qui affiche des volcans sur une carte Leaflet.

Ce repo contient:

- Une api en Node Express [Volcano-API](https://github.com/benoitsemifir/Volcano-k8s/tree/main/VolcanoApi)
- Quelques données en JSON des volcans :volcano: (à déployer sur une base de données MongoDB par exemple):
  - position des volcans (utile pour l'app)
  - Nom
  - Type
  - etc.
- Un serveur web [Volcano-app](https://github.com/benoitsemifir/Volcano-k8s/tree/main/VolcanoApp)
  - Simple page HTML/CSS avec du JS qui contacte l'API
  - Une carte Leaflet qui est remplie avec les résultats de l'API

