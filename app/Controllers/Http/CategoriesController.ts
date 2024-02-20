import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Categories from 'App/Models/Categories'

export default class CategoriesController {
  public async get({ params, response }) {
    try {
      let categorie;
      let msg;
      if (params.id) {
        categorie = await Categories.find(params.id);
        msg = `Aucune catégorie avec l'identifiant ${params.id}`;
      } else {
        categorie = await Categories.all();
        msg = `Impossible de récupérer les catégories`
      }

      if (Object.keys(categorie).length === 0) {
        return response.status(404).send({ message: msg });
      }
      
      return categorie;
    } catch (error) {
      return response.status(500).send({ message: error.message });
    }
  }

  /**
   * Retourne toutes les categorie selon le niveau
   * @returns {Json} Retourne un json de toutes les occurences trouvé en base
   */
  public async getByLevel({ params, response })
  {
    try {
      if (!params.level) {
        return response.status(404).send({ message: `Veuillez renseigner la categorie` });
      }
      let categorie = await Categories.query().where('level', params.level);
      if (Object.keys(categorie).length === 0) {
        return response.status(404).send({ message: `Catégorie non trouvé`})
      }
      return categorie
    } catch (error) {
      return response.status(500).send({ message: error.message });
    }
  }

  public async getByLibelle({ params, response }) {
    try {
      if (!params.libelle) {
        return response.status(404).send({ message: `Veuillez renseigner la categorie` });
      }
      const categorie = await Categories.query().whereRaw('LOWER(libelle) = LOWER(?)', [params.libelle]);

      if (Object.keys(categorie).length === 0) {
        return response.status(404).send({ message: `Catégorie non trouvé`})
      }
      return categorie
    } catch (error) {
      return response.status(500).send({ message: error.message });
    }
  }

  public async addOrUpdate({ request, response }: HttpContextContract): Promise<void> {
    try {
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

      msg = "mis à jour";
      if (data.id) {
        // On check avec l'id si la categorie existe déjà
        categorie = await Categories.find(data.id)
      } else if (data.libelle && !categorie) {
          // On check si le libelle existe déjà
          categorie = await Categories.query().whereRaw('LOWER(libelle) = LOWER(?)', [data.libelle]).first();
      }

      // Avant de créer une nouvelle occurence on check si on à bien les infos nécessaire
      if (!data.id_parent && !data.libelle_parent && data.level !== 1) {
        return response.status(422).send({ message :"Veuillez renseigner l'identifiant de la catégorie parente ou son libelle"});
      }

      let categorieParent;
      // Si on est pas en level 1 on vérifie l'existence des levels parents
      if (data.level !== 1) {
        // Ensuite on check que  l'id parent correspond bien à une categorie qui existe
        if (data.id_parent) {
          categorieParent = await Categories.findBy(`id_parent`, data.id_parent);    
        }

        // Ou a défaut si le libelle existe
        if (!categorieParent && data.libelle_parent) {
          categorieParent = await Categories.query().whereRaw('LOWER(libelle) = LOWER(?)', [data.libelle_parent]).first();
        }

        // Si on à pas trouvé de catégorie parente => erreur
        if (!categorieParent) {
          return response.status(422).send({ message :"Aucune catégorie parente trouvé avec cet identifiant et/ou libellé"});
        }
      }
      // Sinon c'est une nouvelle catégorie à ajouter
      if (!categorie) {
        categorie = new Categories();
        msg = "ajouté";
      }

      if (data.level !== 1) {
        categorie.id_parent = categorieParent.id
      }

      categorie.level = data.level
      categorie.libelle = data.libelle;
      categorie.color = data.color;
      await categorie.save();

      return response.status(200).send({ message: `Catégorie ${data.libelle} ${msg} avec succès`});
    } catch (error) {
        return response.status(422).send(error.messages);
    }
  }
}
