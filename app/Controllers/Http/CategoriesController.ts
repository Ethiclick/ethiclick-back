import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
// import Logger from '@ioc:Adonis/Core/Logger'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import CategorieOne from 'App/Models/CategorieOne'
import CategorieTwo from 'App/Models/CategorieTwo'
import CategorieThree from 'App/Models/CategorieThree'

export default class CategoriesController {
  /**
   * Retourne les catégories de niveau 1
   * @returns {Json} Retourne un json de toutes les occurences trouvé en base
   */
  public async getCatOne() {
    const Categorie1 = await CategorieOne.all()
    return Categorie1
  }

  /**
   * Retourne les catégories de niveau 2
   * @returns {Json} Retourne un json de toutes les occurences trouvé en base
   */
  public async getCatTwo() {
    const Categorie2 = await CategorieTwo.all()
    return Categorie2
  }

  /**
   * Retourne les catégories de niveau 3
   * @returns {Json} Retourne un json de toutes les occurences trouvé en base
   */
  public async getCatThree() {
    const Categorie3 = await CategorieThree.all()
    return Categorie3
  }

  public async add({ request, response }: HttpContextContract): Promise<void> {
    try {
      // TODO: ajouter !== si pas level 1 alors on à aussi besoin de l'id_parent ou à défault libelle_parent
      // TODO: ajouter fonction pour chaque niveau
      const validations = schema.create({
        libelle: schema.string.optional(),
        level: schema.number(),
        color: schema.string.optional(),
        id: schema.number.optional(),
        id_parent: schema.number.optional(),
        libelle_parent: schema.string.optional(),
      })
  
      const data = await request.validate({ schema: validations });
      let categorie;
      let msg;

      // Level 1
      if (data.level == 1) {
          msg = "mis à jour";
          if (data.id) {
            // On check avec l'id si la categorie existe déjà
            categorie = await CategorieOne.find(data.id)
          } else if (data.libelle && !categorie) {
            // On check si le libelle existe déjà
            categorie = await CategorieOne.query().whereRaw('LOWER(libelle) = LOWER(?)', [data.libelle]).first();
          }
          // Sinon c'est une nouvelle catégorie
          if (!categorie) {
            categorie = new CategorieOne();
            msg = "ajouté";
          }
      }

      // Level 2
      if (data.level == 2) {
        msg = "mis à jour";
        if (data.id) {
          // On check avec l'id si la categorie existe déjà
          categorie = await CategorieTwo.find(data.id)
        } else if (data.libelle && !categorie) {
            // On check si le libelle existe déjà
            categorie = await CategorieTwo.query().whereRaw('LOWER(libelle) = LOWER(?)', [data.libelle]).first();
        } 

        // Avant de créer une nouvel occurence on check si on à bien les infos nécessaire
        if (!data.id_parent && !data.libelle_parent) {
          return response.status(422).send({ message :"Veuillez renseigner l'identifiant de la catégorie parente ou son libelle"});
        }


        let categorieParent;
        // Ensuite on check que  l'id parent correspondent bien à une categorie qui existe
        if (data.id_parent) {
          categorieParent = await CategorieOne.find(data.id_parent);    
        }
        // Ou a défaut si le libelle existe
        if (!categorieParent && data.libelle_parent) {
          categorieParent = await CategorieOne.query().whereRaw('LOWER(libelle) = LOWER(?)', [data.libelle_parent]).first();
        }

        // Si on à pas trouvé de catégorie parente => erreur
        if (!categorieParent) {
          return response.status(422).send({ message :"Aucune catégorie parente trouvé avec cet identifiant et/ou libellé"});
        }
        // Sinon c'est une nouvelle catégorie à ajouter
        if (!categorie) {
          // return "Création de categorie";
          categorie = new CategorieTwo();
          msg = "ajouté";
        }
        categorie.idcat1 = categorieParent.id;
      }

      // Level 3
      if (data.level == 3) {
        msg = "mis à jour";
        if (data.id) {
          // On check avec l'id si la categorie existe déjà
          categorie = await CategorieThree.find(data.id)
        } else if (data.libelle && !categorie) {
            // On check si le libelle existe déjà
            categorie = await CategorieThree.query().whereRaw('LOWER(libelle) = LOWER(?)', [data.libelle]).first();
        } 

        // Avant de créer une nouvel occurence on check si on à bien les infos nécessaire
        if (!data.id_parent && !data.libelle_parent) {
          return response.status(422).send({ message :"Veuillez renseigner l'identifiant de la catégorie parente ou son libelle"});
        }

        let categorieParent;
        // Ensuite on check que  l'id parent correspondent bien à une categorie qui existe
        if (data.id_parent) {
          categorieParent = await CategorieTwo.find(data.id_parent);    
        }
        // Ou a défaut si le libelle existe
        if (!categorieParent && data.libelle_parent) {
          categorieParent = await CategorieTwo.query().whereRaw('LOWER(libelle) = LOWER(?)', [data.libelle_parent]).first();
        }

        // Si on à pas trouvé de catégorie parente => erreur
        if (!categorieParent) {
          return response.status(422).send({ message :"Aucune catégorie parente trouvé avec cet identifiant et/ou libellé"});
        }
        // Sinon c'est une nouvelle catégorie à ajouter
        if (!categorie) {
          categorie = new CategorieThree();
          msg = "ajouté";
        }
        categorie.idcat2 = categorieParent.id;
      }

      categorie.libelle = data.libelle;
      // TODO: si color n'est pas définis generate random, coté front ???
      categorie.color = data.color;

      await categorie.save();
      return response.status(200).send({ message: `Catégorie ${data.libelle} ${msg} avec succès`});
    } catch (error) {
        return response.status(422).send(error.messages);
    }
  }
  
}
