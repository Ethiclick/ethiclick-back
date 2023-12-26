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

  /**
   * Création d'un utilisateur
   * @returns {Boolean}
   */
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


  /**
   * update
   * Met à jour les champs: usernmae, password, phone_number & avatar
   * @returns {String} Json
   */
  public async update ({ request, response }: HttpContextContract) {
    try {
      // TODO: ajouter vérif si des champs sont vide return erreur user friendly
      // validation des champs
      const validations = schema.create({
        password: schema.string({}, [rules.confirmed()]),
        id: schema.number(),
        username: schema.string(),
        phone_number: schema.string({}, [rules.maxLength(12), rules.minLength(10)]),
        avatar: schema.string({})
      })
      // Validation des données de la requête
      const data = await request.validate({ schema: validations })

      // Récupération de l'utilisateur authentifié
      const user = await Users.findOrFail(data.id)
  
  
      // Mettre à jour
      user.username = data.username
      user.password = await Hash.make(data.password)
      user.phone_number = data.phone_number
      user.avatar = data.avatar

  
      await user.save()

      return response.status(200).send({ message: 'Utilisateur mis à jour avec succès' });
    } catch (error) {
      return response.status(422).send(error.messages);
    }
  }

  public async setFavoris ({ request, response }: HttpContextContract) {
    try {
      // TODO: ajouter vérif si des champs sont vide return erreur user friendly
      // validation des champs
      const validations = schema.create({
        id: schema.number(),
        favoris: schema.string([rules.json()]),
      })
      // Validation des données de la requête
      const data = await request.validate({ schema: validations })
      
      // Récupération de l'utilisateur authentifié
      const user = await Users.findOrFail(data.id)
  
      // Mettre à jour
      user.favoris = data.favoris

      await user.save()

      return response.status(200).send({ message: 'Favoris mis à jour avec succès' });
    } catch (error) {
      return response.send({ message: "Erreur lors de la mise à jour des favoris"})
    }
  }

  // logout function
  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.status(200)
  }
}
