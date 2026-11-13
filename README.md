# SNOW HUB

Site personnel en HTML, CSS et JavaScript vanilla : aucune dépendance, aucun build.
Thème sombre bleu glacier, navigation latérale (menu sur mobile), recherche et filtres, pages de détails, démos web inoffensives, page 404.

## Lancer le site en local

Le plus fiable est un petit serveur local (les téléchargements et les liens fonctionnent comme en ligne) :

```bash
cd SNOW-HUB
python -m http.server 8080
```

Puis ouvrir http://localhost:8080. Alternative : l'extension « Live Server » de VS Code, clic droit sur `index.html`.
Ouvrir `index.html` directement dans le navigateur fonctionne aussi pour une simple visite.

## Publier gratuitement

**GitHub Pages**
1. Créer un dépôt GitHub (par exemple `snow-hub`) et y envoyer tout le contenu du dossier `SNOW-HUB`.
2. Settings, puis Pages, puis « Deploy from a branch », branche `main`, dossier `/ (root)`.
3. Le site est en ligne sur `https://<pseudo>.github.io/snow-hub/`. Tous les chemins sont relatifs : ils marchent dans un sous-dossier.

**Cloudflare Pages ou Netlify** : créer un projet, déposer le dossier (glisser-déposer sur Netlify Drop), aucune commande de build, dossier de sortie = racine. `404.html` est reconnu automatiquement.

## Structure

```
SNOW-HUB/
├── index.html            Home
├── 404.html              Page d'erreur autonome
├── css/style.css         Styles, animations et responsive (un seul fichier)
├── js/
│   ├── data.js           TOUT le contenu (projets, lab, téléchargements, mises à jour)
│   ├── main.js           Navigation, transitions, voyant de statut, cartes, Home
│   ├── projects.js       My Lab, My Projects, recherche, filtres, page de détails
│   ├── downloads.js      Downloads : catégories, liste, détails, téléchargement
│   └── demos.js          Démos web inoffensives du Lab
├── pages/
│   ├── lab.html  projects.html  socials.html  downloads.html
│   ├── detail.html       Détails d'un projet (?type=lab|project&id=...)
│   └── download.html     Détails d'un fichier (?id=...)
├── assets/ images/ icons/ previews/
└── downloads/SWLauncherBetaV1.zip   Le vrai fichier fourni, non modifié
```

## Modifier le contenu

Tout se trouve dans `js/data.js`. Pour ajouter un téléchargement : placer le fichier dans `downloads/`, puis l'ajouter à `items` de la bonne catégorie (copier l'exemple de `SWLauncher Beta V1`, et recalculer le SHA-256 avec `sha256sum fichier` ou `Get-FileHash fichier` sous PowerShell). Une catégorie sans `items` affiche « Coming Soon ».

SWLauncherBeta n'apparaît que dans Downloads, puis Beta. Il n'est affiché ni sur la page principale Downloads, ni ailleurs.

## Sécurité du Lab

Le site ne publie que des fiches de présentation et des démos qui tournent dans l'onglet : pas de son, pas de plein écran, pas de stockage, pas de réseau. Les scripts `.bat` et `.ps1` de `Viruses.zip` ne sont pas inclus, ni le son `.mp3`. Seules les quatre images du prank Raining Tacos sont utilisées comme aperçu.

## Origine du contenu

Les textes viennent des fichiers fournis : `Viruses.zip`, `SWLauncherBetaV1.zip` et la capture d'écran de SWLAUNCHER. Aucune fonctionnalité n'a été ajoutée au-delà de ce que ces fichiers montrent.
