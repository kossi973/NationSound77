# NationSound77
Déploiement de l'application Nation Sound
-----------------------------------------

L'application est composée d'un front-office développé en React JS Typescript (NationSound77) et d'un back-office réalisé avec WordPress (NationSound77BkEnd)
Le site est déployé chez l'hébergeur Infinityfree.
L'adresse du site : https://nationsound77.infinityfreeapp.com/

Déployer le front: NationSound77
------------------
npm run build du projet
via FTP, copier le contenu du répertoire local "dist" dans le répertoire distant "htdocs"

Déployer le back: NationSound77BkEnd
-----------------
Dans le répertoire "htdocs", créer un sous-répertoire (par ex: "\nationsound-wp")
via FTP, copier le contenu du répertoire local "\app\public" dans le répertoire distant "\htdocs\nationsound-wp"
En local, via l'outil de développement dédié à WordPress (ex: Local, XAMPP,...), exporter la base de données locale du back-office wordpress au format .sql.
En distant, dans l'outil "phpMyAdmin" de gestion de BDD de Infinityfree, importer le fichier .sql.
Editer la table wp_options; modifier les lignes siteurl et home avec la valeur "https://nationsound77.infinityfreeapp.com/nationsound-wp".
Dans WordPress, mettre à jour les éventuels liens pointant vers une adresse local avec l'adresse "https://nationsound77.infinityfreeapp.com/nationsound-wp".

Prévenir l'erreur 404 lors du refresh de la page par l'utilisateur:
----------------------
Copier le fichier \htdocs\.htaccess dans \htdocs
Editer le fichier et modifier la ligne (13) :
   RewriteRule . /nationsound-wp/index.php [L]
en RewriteRule . /index.html [L]
