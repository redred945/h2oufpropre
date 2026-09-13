# H2OUF PROPRE 45

Site vitrine — nettoyage auto, canapé, tapis &amp; matelas à domicile, sur Orléans et son agglomération. Disponible 24h/24.

Page statique, sans build : `index.html` / `nettoyage-auto.html` / `canape-textile.html` / `contact.html` / `mentions-legales.html` + `assets/`.

Identité visuelle originale (bleu/cyan "eau claire", Poppins + Inter), distincte du site CKLEAN AUTO 45 et du design du site précédent (fait par un autre prestataire, sur Framer) — le design de ce site précédent n'a pas été repris. Le logo et les 3 photos hero (`assets/heros/`) ont été fournis directement par le client ; les 8 photos dans `assets/realisations/` sont ses propres photos d'interventions, conservées à sa demande.

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
- **Photos** : le logo réel du client est utilisé partout (header/footer/favicon/apple-touch-icon/og-image), 3 photos hero (`assets/heros/`) illustrent l'accueil et les 2 pages de service, et 8 photos d'interventions (`assets/realisations/`) alimentent la galerie et les bandeaux "pourquoi nous choisir". Couverture encore incomplète : aucune photo de tapis ni de matelas — à demander au client si possible, des photos de smartphone suffisent.
- `assets/og-image.jpg` (image de partage réseaux sociaux) est désormais un raster JPG 1200×630 (généré à partir du vrai logo, compatible Facebook/X/WhatsApp).
- Un crédit « Powered by Redesign » (`assets/redesign-logo.jpg`) a été ajouté en pied de page sur les 5 pages — badge statique (non cliquable) faute d'URL de l'agence à ce jour ; à transformer en lien dès que l'URL est connue.
- Redirections depuis les anciennes URLs Framer lors de la bascule du domaine
