#ADONISJS
https://docs.adonisjs.com/guides/installation

#Run le server, watch permet de restart le server lorsqu'un changement est détecté
node ace serve --watch

#Le serveur tourne alors en local à cette adresse
--> http://localhost:3333/

#Compiler pour la production
node ace build --production

#Démarrer le server
node server.js

#Créer le fichier de migration d'un model
node ace make:migration users

#Une fois crée les script de migration, ajouter les méthode pour ajouter les champs dans la table

#Executer le script de migration (création | update) des tables
node ace migration:run

#Annuler la dernière migration
node ace migration:rollback
