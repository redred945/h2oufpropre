# H2OUF PROPRE 45

Site vitrine — nettoyage auto, canapé, tapis &amp; matelas à domicile, sur Orléans et son agglomération. Disponible 24h/24.

Page statique, sans build : `index.html` / `nettoyage-auto.html` / `canape-textile.html` / `contact.html` / `mentions-legales.html` + `assets/`.

Identité visuelle originale (bleu/cyan "eau claire", Poppins + Inter), distincte du site CKLEAN AUTO 45 et du design du site précédent (fait par un autre prestataire, sur Framer). Les 8 photos dans `assets/realisations/` sont en revanche bien les vraies photos du client (ses propres interventions) — seul le design/site du précédent prestataire n'a pas été repris.

## Développement local
```bash
npx serve .
```

## Déploiement
Prévu pour Vercel — déploiement automatique à chaque push sur `main`.

## Déjà vérifié via la fiche Google du client
- Le client a en réalité **deux fiches Google Business distinctes** : une pour le nettoyage auto (4,9/5, 72 avis) et une pour canapés/tapis/matelas (4,9/5, 32 avis). Les deux notes sont affichées sur l'accueil (section `#confiance`) avec un lien direct vers chaque fiche, et reprises dans le JSON-LD de `nettoyage-auto.html` / `canape-textile.html`. Aucun avis individuel n'a été recopié (droit d'auteur) — seules les notes/chiffres, qui sont des données factuelles, sont utilisées.
- Prénom du gérant confirmé par plusieurs avis : **Florian** (nom de famille encore inconnu).
- SIREN trouvé via une annonce Leboncoin du client : **933 833 386**, ajouté dans `mentions-legales.html` (SIRET complet toujours à compléter).

## À compléter avant mise en ligne
- **Urgent — adresse du siège** : deux adresses différentes circulent pour cette activité — « 287 rue de l'ancien aérodrome, 45770 Saran » (site précédent) vs « 1 rue Saint-Martin-du-Mail, 45000 Orléans » (fiches Google/Pages Jaunes/Mappy, alimentées par sa fiche Google Business). À trancher avec le client avant de mettre à jour `mentions-legales.html`, la carte de la page d'accueil et le JSON-LD `LocalBusiness`.
- **Urgent — e-mail de contact** : tant que la clé Web3Forms n'est pas configurée (voir ci-dessous), *toutes* les demandes du formulaire de contact partent en `mailto:` vers `contact@h2oufpropre45.fr`. Cette adresse n'est pas vérifiée et n'existe peut-être pas encore. Vérifier/créer cette adresse ou la remplacer par la vraie adresse du client avant toute mise en ligne, sous peine de perdre des demandes de devis silencieusement.
- **Urgent — clé Web3Forms** : configurer `access_key` dans `contact.html` pour activer l'envoi direct (ne pas laisser le site vivre uniquement sur le fallback mailto ci-dessus).
- Forme juridique, SIRET complet, e-mail de contact, nom de famille du responsable de publication dans `mentions-legales.html`
- Logo définitif si le client souhaite conserver son visuel actuel (badge rond bleu) plutôt que le wordmark SVG inclus ici
- **Photos** : `assets/realisations/` contient 8 vraies photos du client (intérieurs auto, extérieur SUV, canapé avant/après). Couverture encore incomplète : aucune photo de tapis, de matelas, ni de véhicule extérieur "avant" sale — à demander au client si possible, des photos de smartphone suffisent.
- `assets/og-image.svg` (image de partage réseaux sociaux) fonctionne sur la plupart des plateformes mais Facebook/X préfèrent un raster (JPG/PNG 1200×630) — convertir le SVG si besoin d'une compatibilité maximale
- Redirections depuis les anciennes URLs Framer lors de la bascule du domaine
