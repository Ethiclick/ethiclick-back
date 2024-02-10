import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
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

      const validations = schema.create({
        libelle: schema.string.optional(),
        level: schema.number(),
        color: schema.string.optional(),
        id: schema.number.optional(),
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
          if (data.id) {
            categorie = await CategorieTwo.findOrFail(data.id)
          } else {
            categorie = new CategorieTwo();
          }
      }
      // Level 3
      if (data.level == 3) {
          if (data.id) {
            categorie = await CategorieThree.findOrFail(data.id)
          } else {
            categorie = new CategorieThree();
          }
      }

      categorie.libelle = data.libelle;

      // TODO: si bg_color n'est pas définis generate random
      categorie.color = data.color;
  
      await categorie.save();
      return response.status(200).send({ message: `Catégorie ${msg} avec succès`});
    } catch (error) {
        return response.status(422).send(error.messages);
    }
   
  }
  
}
