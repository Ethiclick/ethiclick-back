
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Users from 'App/Models/User'
import { DateTime } from 'luxon';
import Hash from '@ioc:Adonis/Core/Hash'


export default class UsersController {
    
    public async add(ctx: HttpContextContract) {

        const user = new Users();

        await user.fill(
          {
            role: 'admin',
            email: 'tata@outlook.fr',
            first_name: 'tata',
            last_name: 'tata',
            password: await Hash.make("tata"),
            phone_number: '0677777777',
            birthday: DateTime.fromFormat('1900-01-03', 'yyyy-MM-dd')
          }).save();

      }
}
