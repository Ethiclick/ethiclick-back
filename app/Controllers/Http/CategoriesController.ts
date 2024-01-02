import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CategorieOne from '../../Models/CategorieOne'

export default class CategoriesController {
  /**
   * login
   * @returns {Object} Token d'authentification
   */
  public async get() {

    const Categorie = await CategorieOne.all()
    return Categorie
  }
}
