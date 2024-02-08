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
      // TODO: ajouter une vérification si data.libelle existe déjà => Erreur
      // TODO: ajouter !== si pas de level 1 alors on à aussi besoin de l'id_parent ou à défault libelle_parent

      const validations = schema.create({
        libelle: schema.string.optional(),
        level: schema.number.optional(),
        bg_color: schema.string.optional(),
        id: schema.number(),
      })
  
      const data = await request.validate({ schema: validations });
  
      let categorie;

      // Level 1
      if (data.level == 1) {
          if (data.id) {
            categorie = await CategorieOne.findOrFail(data.id)
          } else {
            categorie = new CategorieOne();
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
      categorie.bg_color = data.bg_color;
  
      await categorie.save();
      // console.log(categorie.$isPersisted); //! check si la valeur à bien été enregistré en base

      return response.status(200).send({ message: 'Catégorie ajouté avec succès'});

    } catch (error) {
        return response.status(422).send(error.messages);
    }
   
  }
  
}
