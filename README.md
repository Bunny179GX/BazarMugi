# Le Bazar des Mugis

Prototype partageable d’une boutique suisse de seconde main. Le site est statique, responsive et ne demande aucune installation.

## Aperçu

- accueil et huit marchés thématiques ;
- 30 articles photographiés, sans les anciennes fiches de test sans image ;
- recherche, filtres, favoris et panier ;
- fiches produit avec galerie, état, prix et livraison ;
- simulation d’une demande de commande ;
- espace vendeur local dans `admin.html`.

## Ouvrir le site

Ouvrir `index.html` avec Edge, Chrome ou Firefox. Toutes les données de démonstration sont enregistrées uniquement dans le stockage local du navigateur.

## Publier avec GitHub Pages

1. Créer un dépôt GitHub vide.
2. Ajouter le contenu de ce dossier à la racine du dépôt.
3. Envoyer la branche `main` sur GitHub.
4. Dans **Settings > Pages**, publier depuis la branche `main` et le dossier `/ (root)`.

La balise `noindex` empêche volontairement les moteurs de recherche d’indexer ce prototype ; il reste accessible à toute personne possédant le lien.

## Limites importantes

Ce dépôt est une démonstration, pas encore une boutique de production :

- aucun paiement réel n’est encaissé ;
- aucun courriel n’est envoyé ;
- les commandes et modifications ne sont pas partagées entre appareils ;
- l’espace vendeur n’est pas authentifié et ne contient aucune donnée serveur ;
- certaines informations produit restent à confirmer ;
- les conditions de vente, retours, confidentialité et frais définitifs restent à valider avant une ouverture commerciale.

Les photos RAW, documents de travail, références personnelles et anciennes images restent conservés localement sur le SSD.

## Structure utile

- `index.html`, `styles.css`, `app.js` : accueil et parcours principal ;
- `marche.html`, `marche.js` : marchés thématiques ;
- `product.html`, `product.js` : fiches produit ;
- `admin.html`, `admin.js` : espace vendeur local ;
- `catalogue-data.js`, `catalogue-reel-2026.js` : catégories et catalogue ;
- `hero/` : images principales des produits ;
- `a-plat/` : vues supplémentaires des produits ;
- `identite-visuelle/` : illustrations de l’accueil et des marchés.

## Droits

Le code, les textes et les images restent la propriété de leur auteur. Aucune licence de réutilisation n’est accordée pour le moment.
