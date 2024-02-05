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
    console.log(request);
    console.log(response);
    const validations = schema.create({
      id_parent: schema.number(),
      libelle: schema.string(),
      libelle_parent: schema.string(),
      level: schema.number()
    })
  }
  
}
