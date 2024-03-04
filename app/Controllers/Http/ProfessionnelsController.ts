import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Professionnel from "App/Models/Professionnel";
import { rules, schema } from '@ioc:Adonis/Core/Validator'

export default class ProfessionnelsController {
  // Regrouper les get => selon le params dispo on renvoie !=
  // si id on renvoie selon l'identifiant
  // si on à le level tout les pros de ce level
  // Sinon on renvoie tout les pros
  public async get () {
    const pro = await Professionnel.all();
    return pro
  }

  public async getById({ params, response }) {
    try {
      const pro = await Professionnel.find(params.id);
      if (!pro) {
        return response.status(404).send({ message: 'Professionnel non trouvé' });
      }
      
      return pro;
    } catch (error) {
      return response.status(500).send({ message: error.message });
    }
  }

  public async update({ request, response }: HttpContextContract): Promise<void> {
    try {
      let regexUrl = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w\-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
      // validation des champs
      const validations = schema.create({
        id: schema.number(),
        // siret : Est ce qu'on peut mettre à jour un siret?
        adresse: schema.string(),
        city: schema.string(),
        postal_code: schema.number(),
        website: schema.string([rules.regex(regexUrl)]),
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
      return response.send(error.messages);
    }
  }

  // TODO:
  // public async getByCat( {}) {
    
  // }
}
 