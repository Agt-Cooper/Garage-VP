# ProjetV2_ECF

# GarageV.Parrot

## How to build

Cloner ce repository dans un emplacement local de votre machine.

### Préparer l'environement de développement :

Ouvrez le terminal à la racine du projet et créer l'environnement virtuel ;

```
python -m venv .env
source .env/bin/activate
```

Note: Le script activate à exécuter peut différer selon votre shell.

Pour plus d'information, se référer à la documentation de venv.

### Installer les paquets Python requis :

```
pip install -r requirements.txt
```

### Lancer le site web
```
./manage.py runserver
```
Le site web est accessible à l'adresse http://127.0.0.1:8000/.

Pour plus d'information sur le script manage, consulter la documentation officielle de Django.

### Remarques !
Les identifiants utilisateurs pour l'espace d'administration sont : Vincent/Parrot

La charte graphique est dans le Trello du projet.

Le projet n'est pas terminé, il ne délivre pas pour l'instant les fonctionnalités suivantes :
Filtre, contact direct sous les annonces et livre d'avis.
Note : la fonction de modification n'est pas terminée.
Il reste plusieurs éléments à mettre en forme pour la future amélioration.
