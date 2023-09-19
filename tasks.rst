########################
Liste des choses à faire
########################

Design et implementation de la BDD
----------------------------------

- [ ] Utilisateurs
  - [ ] Employés
  - [ ] Admins
- [ ] horaires du garage
- [ ] Services
- [ ] Mail visiteur
- [ ] Avis
- [ ] Véhicules
  - [ ] Media
  - [ ] équipements et options
  - [ ] Caractéristiques


US1. L'administrateur et l'Employé peuvent se connecter en utilisant leur e-mail + mot de passe sécurisé.
=========================================================================================================

- [ ] Front-End: Page de connexion
- [ ] Back-End: Sessions via Django
- [ ] L'administrateur peut créer un compte employé


US3. Définir des horaires d'ouverture
=====================================

- [ ] Les horaires sont disponibles dans le footer du site web
- [ ] L'administrateur peut éditer ces informations depuis le back-office.


US2. Présenter les services
===========================

- [X] Le site web présente les différents services disponibles
- [ ] L'administrateur peut modifier la liste et les détails des services disponibles


US3. Exposer les voitures d'occasion
====================================

- [ ] Afficher le catalogue de véhicules
  - [ ] Prix
  - [ ] Une image à mettre en avant
  - [ ] Année de mise en circulation
  - [ ] Kilométrage
  - [ ] Détails
    - [ ] Plusieurs images
    - [ ] Tableau de caractéristiques
    - [ ] Liste des équipements et options installés dans ce véhicule
- [ ] L'employé et l'administrateur peuvent modifier la liste et les détails


US4. Filtrer la liste des véhicules d'occasion
==============================================

- [ ] L'utilisateur peut afficher une version filtrée du catalogue via les critères:
  - [ ] Fourchette de prix (min/max)
  - [ ] Année de mise en circulation (min/max)
  - [ ] Kilométrage (min/max)
- [ ] Le filtrage se fait sans rechargement de page


US4. Permettre de contacter l'atelier
=====================================

- [ ] L'utilisateur accède à une page de contact qui affiche
  - [ ] Les informations de contact du garage
  - [ ] Un formulaire de contact
    - [ ] Nom
    - [ ] Prénom
    - [ ] email
    - [ ] numéro de téléphone
    - [ ] Corps du message
- [ ] La page de contact est disponible et préremplie dans la page de détails du véhicule


US5 Receuillir les témoignages des clients
==========================================

- [ ] Le visiteur peut laisser un avis sur le garage
  - [ ] Nom
  - [ ] Commentaire
  - [ ] Note ?/5
- [ ] L'émployé ou l'administrateur doit modérer les avis avant qu'ils n'apparaissent
- [ ] Les commentaires approuvés sont visibles depuis la page d'accueil
- [ ] Les employés peuvent ajouter eux-même des témoignages clients
