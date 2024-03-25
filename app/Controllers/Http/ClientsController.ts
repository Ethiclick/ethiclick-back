// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import Users from 'App/Models/User'
import { schema } from '@ioc:Adonis/Core/Validator'
import Client from 'App/Models/Client';
// import ProfessionnelsController from './ProfessionnelsController'
// import ClientsController from './ClientsController'

export default class CientsController {

     /**
   * Insertion d'un pro depuis userController
   * @returns {Client} Retourne une instance d'un client
   */
  public async insert(request, iduser) {
    const validations = schema.create({
      name: schema.string.optional(),
      surname: schema.string.optional(),
      // La date doit être envoyé au format AAAA-MM-JJ
      birthday: schema.date.optional()
    });
    const data = await request.validate({ schema: validations });
    
    data.iduser = iduser;
    const client = await Client.create(data);
    return client;
  }
}
