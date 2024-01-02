import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Professionnel from "App/Models/Professionnel";
import { rules, schema } from '@ioc:Adonis/Core/Validator'


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
        postalCode: schema.number(),
        // TODO: ajouter une rules pour vérifier l'url
        website: schema.string(),
        acc_card: schema.boolean(),
        photos: schema.array().members(schema.string())
      })
      // Validation des données de la requête
      const data = await request.validate({ schema: validations })

      // Récupération de l'utilisateur authentifié
      const pro = await Professionnel.findOrFail(data.id)

      // Mettre à jour
      pro.adresse = data.adresse
      pro.city = data.city
      pro.postalCode = data.postalCode
      pro.website = data.website
      pro.acc_card = data.acc_card
      pro.photos = data.photos

      await pro.save()

      return response.status(200).send({ message: 'Profil mis à jour avec succès' })
    } catch (error) {
      return response.status(422).send(error.messages)
    }
  }

}
