import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Professionnel from "App/Models/Professionnel";
import { rules, schema } from '@ioc:Adonis/Core/Validator'

export default class ProfessionnelsController {
  // Regrouper les get => selon le params dispo on renvoie !=
  // si id on renvoie selon l'identifiant
  // si on à le level tout les pros de ce level
  // Sinon on renvoie tout les pros
  public async get ()
  {
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
        id: schema.number.optional(),
        adresse: schema.string.optional(),
        city: schema.string.optional(),
        postal_code: schema.number.optional(),
        website: schema.string.optional([rules.regex(regexUrl)]),
        acc_card: schema.boolean.optional(),
        photos: schema.string.optional(),
        nom: schema.string.optional()
      })

      // Validation des données de la requête
      const data = await request.validate({ schema: validations })

      if (!data.id) {
        return response.status(400).send({ message: 'Veuillez renseigner l\'identifiant de l\'utilisateur pour le mettre à jour' });
      }
      // Récupération de l'utilisateur à modifier
      const pro = await Professionnel.findOrFail(data.id)

      // Mettre à jour
      if (data.adresse) pro.adresse = data.adresse;
      if (data.city) pro.city = data.city;
      if (data.postal_code) pro.postal_code = data.postal_code;
      if (data.website) pro.website = data.website;
      if (data.acc_card) pro.acc_card = data.acc_card
      if (data.photos) pro.photos = data.photos
      if (data.nom) pro.nom = data.nom

      await pro.save()

      return response.status(200).send({ message: 'Profil mis à jour avec succès' })
    } catch (error) {
      return response.send({ "message" : error.message});
    }
  }

  public async getByCat({ params, response }) {
    try {
      let field = `idcat1`;
      // Si on à pas de level on suppose que c'est cat1
      if (params.level === "2") {
        field = `idcat2`
      } else if (params.level === "3") {
        field = `idcat3`
      }

      const professionnel = await Professionnel.query().where(field, params.id);
      if (professionnel.length < 1) {
        return response.status(404).send({ message: `Aucun professionnel trouvé dans cette catégorie` });
      }
      return professionnel;
    } catch (error) {
      return response.status(404).send({ message: `Erreur lors de la récupération des professionnels liés à cette catégorie` });
    }
    
  }
}
 