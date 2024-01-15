import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Professionnel from "App/Models/Professionnel";
import { schema } from '@ioc:Adonis/Core/Validator'

export default class ProfessionnelsController {
  public async get () {
    const pro = await Professionnel.all();
    return pro
  }

  public async update({ request, response }: HttpContextContract): Promise<void> {
    try {
      // validation des champs
      const validations = schema.create({
        id: schema.number(),
        // siret : Est ce qu'on peut mettre à jour un siret?
        adresse: schema.string(),
        city: schema.string(),
        postal_code: schema.number(),
        // TODO: ajouter une rules avec une regex pour vérifier l'url
        website: schema.string(),
        acc_card: schema.boolean(),
        photos: schema.string(),
      })

      // Validation des données de la requête
      const data = await request.validate({ schema: validations })
      // Récupération de l'utilisateur à modifier
      const pro = await Professionnel.findOrFail(data.id)

      // Mettre à jour
      pro.adresse = data.adresse
      pro.city = data.city
      pro.postal_code = data.postal_code
      pro.website = data.website
      pro.acc_card = data.acc_card
      pro.photos = data.photos

      await pro.save()

      return response.status(200).send({ message: 'Profil mis à jour avec succès' })
    } catch (error) {
      return response.send({ message: "Erreur lors de la mise à jour - " + error.message });
    }
  }

}
