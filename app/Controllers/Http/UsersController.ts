// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Users from 'App/Models/User'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Hash from '@ioc:Adonis/Core/Hash'

export default class UsersController {
  /**
   * getToken
   * @returns {Object} Token d'authentification à partir d'un identifiant
   */
  public async getToken({ params, auth }: HttpContextContract): Promise<
    | {
        type: 'bearer'
        token: string
        expires_at?: string | undefined
        expires_in?: number | undefined
      }
    | undefined
  > {
    const id = params.id

    const user = await Users.query().where('id', id).firstOrFail()

    try {
      const token = await auth.use('api').generate(user)
      return token.toJSON()
    } catch (error) {
      console.log(error)
    }
  }

  public async register({ request, response }: HttpContextContract) {
    // validate email
    const validations = schema.create({
      email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
      password: schema.string({}, [rules.confirmed()]),
    })

    const data = await request.validate({ schema: validations })
    data.password = await Hash.make(data.password)
    const user = await Users.create(data)
    return response.created(user)
  }
  /**
   * login
   * @returns {Object} Token d'authentification
   */
  public async login({ auth, request, response }: HttpContextContract): Promise<{
    type: 'bearer'
    token: string
    expires_at?: string | undefined
    expires_in?: number | undefined
  } | void> {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('api').attempt(email, password)

      return token.toJSON()
    } catch (error) {
      console.error(error.message)
      return response.unauthorized({
        errors: [{ message: 'Identifiant incorrect.' }],
      })
    }
  }

  // logout function
  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.status(200)
  }
}
