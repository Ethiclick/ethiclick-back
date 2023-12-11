import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CategorieOne from '../../Models/CategorieOne';

export default class CategoriesController {
     /**
     * login
     * @returns {Object} Token d'authentification
     */
     public async get({ auth, request, response }) {
        

        console.log(auth)
        console.log(request)
        console.log(response)

        const Categorie = await CategorieOne
        .all()
        // .orderBy('id', 'asc')

        return Categorie
    }
}
