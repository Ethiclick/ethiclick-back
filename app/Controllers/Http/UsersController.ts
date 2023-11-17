
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'


export default class UsersController {
    
    public async index(ctx: HttpContextContract) {
        // TODO: ajouter un select * from user avec les outils Query adonisJS
        // return 
        // await Database.query().from('users').select("*");
        return [
          {
            id: 1,
            title: 'Hello world',
          },
          {
            id: 2,
            title: 'Hello universe',
          },
        ]



      }
}
