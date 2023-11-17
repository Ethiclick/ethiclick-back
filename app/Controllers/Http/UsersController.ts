
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Users from 'App/Models/User'
import { DateTime } from 'luxon';


export default class UsersController {
    
    public async index(ctx: HttpContextContract) {

        const user = new Users();

        await user.fill({role:'admin', email: 'fabwnklr@outlook.com', first_name: 'Fabien', last_name: 'Winkler', password: 'toto', phone_number: '0625454545', birthday: DateTime.fromFormat('1995-09-04', 'yyyy-MM-dd')}).save();

      }
}
