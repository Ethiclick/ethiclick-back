import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import CategorieOne from 'App/Models/CategorieOne'
import CategorieTwo from 'App/Models/CategorieTwo'
import CategorieThree from 'App/Models/CategorieThree'
import Database from '@ioc:Adonis/Lucid/Database'
import CategorieOnes from '../../../database/migrations/4_1699902493597_categorie_ones';

export default class CategoriesController {
  // TODO: regrouper les 3 get en 1  fonction en 1 seul avc un param level
  /**
   * Retourne les catégories selon le niveau
   * @returns {Json} Retourne un json de toutes les occurences trouvé en base
   */
  public async getByLevel({ params, response }) {
    try {
      let Categories;
      if (params.level == 1) {
        Categories = await CategorieOne.all()
      }
      if (params.level == 2) {
        Categories = await CategorieTwo.all()
      }
      if (params.level == 3) {
        Categories = await CategorieThree.all()
      }
      return Categories
    } catch (error) {
      return response.status(500).send({ message: error.message });
    }
  }

  public async addOrUpdate({ request, response }: HttpContextContract): Promise<void> {
    try {

      // TODO: Amélioration : compartimenter les levels - regrouper le code répété
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
  
  public async getAll() {
    try {
      const query = await Database
        .from('categorie_ones')
        .join('categorie_twos', 'categorie_ones.id', '=', 'categorie_twos.idcat1')
        .join('categorie_threes', 'categorie_twos.id', '=', 'categorie_threes.idcat2')
        .select('categorie_ones.*')
        .select('categorie_twos.libelle AS level2', 'categorie_twos.color AS level2_color', 'categorie_twos.id AS level2_id')
        .select('categorie_threes.libelle AS level3', 'categorie_threes.color AS level3_color', 'categorie_threes.id AS level3_id');


      const results = query.reduce((acc, curr) => {
        if (!acc.id) {
          // Première itérations
          acc.id = curr.id;
          acc.libelle = curr.libelle;
          acc.color = curr.color;
          acc.created_at = curr.created_at;
          acc.updated_at = curr.updated_at;
          acc.level2 = {};
        }
        if (!acc.level2[curr.level2]) {
          acc.level2[curr.level2] = { id: curr.level2_id, color: curr.level2_color, level3: {} };
        }
        acc.level2[curr.level2].level3[curr.level3] = { id: curr.level3_id, color: curr.level3_color };
        return acc;
      }, {});

      return results;

    } catch (error) {
       return error.message;

    }
    
  }

  public async getById({ params, response }) {
    try {
      let categorie;
      if (params.level == 1) {
        categorie = await CategorieOne.find(params.id);
      }
      if (params.level == 2) {
        categorie = await CategorieTwo.find(params.id);
      }
      if (params.level == 3) {
        categorie = await CategorieThree.find(params.id);
      }
      if (!categorie) {
        return response.status(404).send({ message: 'Catégorie non trouvé' });
      }
      
      return categorie;
    } catch (error) {
      return response.status(500).send({ message: error.message });
    }
  }
}
