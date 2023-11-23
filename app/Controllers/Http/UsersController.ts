// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

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

    /**
     * getToken
     * @returns {Object} Token d'authentification à partir d'un identifiant
     */
    public async getToken({ params, auth }: HttpContextContract) {
        const id = params.id;

        const user = await Users
            .query()
            .where('id', id)
            .firstOrFail()
        
          try {
            const token = await auth.use('api').generate(user)
            return token
          } catch (error) {
            console.log(error)
          }
    }

    
    /**
     * login
     * @returns {Object} Token d'authentification
     */
    public async login({ auth, request, response }) {
        const email = request.input('email')
        const password = request.input('password')
         
        try {
          const token = await auth.use('api').attempt(email, password)
          return token
        } catch (error){
          console.error(error.message);
          return response.unauthorized('Invalid credentials')
        }
    }
}
