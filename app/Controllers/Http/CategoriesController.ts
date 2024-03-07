import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import CategorieOne from 'App/Models/CategorieOne'
import CategorieTwo from 'App/Models/CategorieTwo'
import CategorieThree from 'App/Models/CategorieThree'
import Database from '@ioc:Adonis/Lucid/Database'


export default class CategoriesController {

  public async get({ params, response }) {
    try {
      let results;
      // Si on à que le level on renvoie toutes les cat d'un niveau
      if (params.level && !params.id) {
        results = await this.getByLevel(params.level, response);
        // Si on à pas un obj c'est un msg d'erreur
        if (typeof results !== "object") {
          return response.status(422).send({ message : results });
        }
      } else if (params.level && params.id) {

        results = await this.getById(params.level, params.id);
        // Si on à pas un obj c'est un msg d'erreur
        if (typeof results !== "object") {
          return response.status(422).send({ message : results });
        }
      } else {
        // On récupère toutes les catégories et leurs sous niveaux
        const query = await Database
        .from('categorie_ones')
        .leftJoin('categorie_twos', 'categorie_ones.id', '=', 'categorie_twos.idcat1')
        .leftJoin('categorie_threes', 'categorie_twos.id', '=', 'categorie_threes.idcat2')
        .select('categorie_ones.*')
        .select('categorie_twos.libelle AS level2', 'categorie_twos.color AS level2_color', 'categorie_twos.id AS level2_id')
        .select('categorie_threes.libelle AS level3', 'categorie_threes.color AS level3_color', 'categorie_threes.id AS level3_id');

        results = query.reduce((acc, curr) => {
          let existingItem = acc.find(item => item.id === curr.id);

          if (!existingItem) {
              // Nouvelle entrée pour le niveau 1
              existingItem = {
                  id: curr.id,
                  libelle: curr.libelle,
                  color: curr.color,
                  created_at: curr.created_at,
                  updated_at: curr.updated_at,
                  level2: null
              };
              acc.push(existingItem);
          }

          if (curr.level2) {
              // Ajouter des données de niveau 2 si elles existent
              existingItem.level2 = {
                  libelle: curr.level2,
                  color: curr.level2_color,
                  id: curr.level2_id,
                  level3: null
              };

              if (curr.level3) {
                  // Ajouter des données de niveau 3 si elles existent
                  existingItem.level2.level3 = {
                      libelle: curr.level3,
                      color: curr.level3_color,
                      id: curr.level3_id
                  };
              }
          }

          return acc;
        }, []);
      }
     
      return results;

    } catch (error) {
      return response.status(422).send({ message : error.messages });
    }
  }

  /**
   * Retourne les catégories selon le niveau
   * @returns {string|Object} Retourne un json de toutes les occurences trouvé en base
   */
  public async getByLevel(level, response) {
    try {

      if (isNaN(level)) {
        return `Le paramètre level doit être un entier`;
      }
      
      let Categories;
      if (level == 1) {
        Categories = await CategorieOne.all()
      }
      if (level == 2) {
        Categories = await CategorieTwo.all()
      }
      if (level == 3) {
        Categories = await CategorieThree.all()
      }
      return Categories
    } catch (error) {
      return response.status(422).send({ message : error.messages });
    }
  }

  public async getById(level, id) {
    try {

      // On check le types des variables
      if (isNaN(level)) {
        return `Le paramètre level doit être un entier`;
      }
      if (isNaN(id)) {
        return `L'identifiant doit être un entier`;
      }

      let categorie;
      if (level == 1) {
        categorie = await CategorieOne.find(id);
      }
      if (level == 2) {
        categorie = await CategorieTwo.find(id);
      }
      if (level == 3) {
        categorie = await CategorieThree.find(id);
      }
      if (!categorie) {
        return `Catégorie non trouvée`;
      }
      
      return categorie;
    } catch (error) {
      return error.message;
    }
  }

  public async getByLibelle ({params, response }) {

    // Gérer le cas où le paramètre libelle est manquant ou n'est pas une chaîne valide
    if (!params.libelle || /\d/.test(params.libelle)) {
      return response.status(400).send({ message : `Le libelle est invalide : ${params.libelle}` });
    }
    
    let categorie;
    // On check dans chaque categorie si on a un libelle qui correspond
    categorie = await CategorieOne.query().whereRaw('LOWER(libelle) = LOWER(?)', [params.libelle]).first();
    if (!categorie) {
      categorie = await CategorieTwo.query().whereRaw('LOWER(libelle) = LOWER(?)', [params.libelle]).first();
    }
    if (!categorie) {
      categorie = await CategorieThree.query().whereRaw('LOWER(libelle) = LOWER(?)', [params.libelle]).first();
    }
  
    // Si ici on a tjrs pas de categorie c'est qu'elle n'existe pas
    if (!categorie) {
      return response.status(422).send({ message : `Aucune catégorie ne correspond au libelle : ${params.libelle}` });
    }
    return categorie;
  }

  public async addOrUpdate({ request, response }: HttpContextContract): Promise<void> {
    try {

      // TODO: Amélioration : compartimenter les levels - regrouper le code répété
      const validations = schema.create({
        libelle: schema.string.optional(),
        level: schema.number.optional(),
        color: schema.string.optional(),
        id: schema.number.optional(),
        id_parent: schema.number.optional(),
        libelle_parent: schema.string.optional(),
      })
  
      const data = await request.validate({ schema: validations });
      let categorie;
      let msg;

      // Level 1
      if ( (data.level && data.level == 1) || (data.id && !data.level) ) {
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
