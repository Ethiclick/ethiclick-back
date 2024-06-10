import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Users from 'App/Models/User'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import ProfessionnelsController from './ProfessionnelsController'
import ClientsController from './ClientsController'

export default class UsersController {
  /**
   * Création d'un utilisateur
   */
  public async register({ request, response }: HttpContextContract) {
    const validations = schema.create({
      email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
      password: schema.string({}, [rules.confirmed()]),
      username: schema.string.optional(),
      phone_number: schema.string.optional(),
      avatar: schema.string.optional(),
      idrole: schema.number.optional(),
    })

    const data = await request.validate({ schema: validations })

    // Client par défaut
    if (!data.idrole) {
      data.idrole = 3
    }
    // Avatar par défaut
    if (!data.avatar) {
      data.avatar = '../assets/avatar.png'
    }

    const user = await Users.create(data)

    // Role 1: Admin |  2: pro |  3: Client
    if (data.idrole === 2) {
      // insertion d'un pro
      const proModel = new ProfessionnelsController()
      const pro = await proModel.insert(request, user.id)
      return { pro, user }
    }
    if (data.idrole === 3) {
      const clientModel = new ClientsController()
      const client = await clientModel.insert(request, user.id)
      return { client, user }
    }
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
    // console.log(email, password)

    try {
      const token = await auth.use('api').attempt(email, password)
      return token.toJSON()
    } catch (error) {
      console.error(error.message)
      return response.unauthorized({
        errors: [{ message: 'Identifiant ou mot de passe incorrect.' }],
      })
    }
  }

  public async get({ auth, response }: HttpContextContract): Promise<void> {
    try {
      // On vérifie d'abord que le token est valide
      await auth.use('api').authenticate()
      // On récup le user
      const user = auth.use('api').user!
      // On vire le password
      user.password = ''

      return response.send(user)
    } catch (error) {
      return response
        .status(400)
        .send({ message: "Erreur lors de la récupération de l'utilisateur" })
    }
  }

  /**
   * update
   * Met à jour les champs: username, phone_number & avatar
   * Pour la modificaiton du mdp => autre circuit
   * Pas de modification du mail !
   */
  public async update({ request, response }: HttpContextContract): Promise<void> {
    try {
      // validation des champs
      const validations = schema.create({
        id: schema.number(),
        username: schema.string(),
        phone_number: schema.string({}, [rules.maxLength(12), rules.minLength(10)]),
        avatar: schema.string({}),
      })
      // Validation des données de la requête
      const data = await request.validate({ schema: validations })

      // Récupération de l'utilisateur authentifié
      const user = await Users.findOrFail(data.id)
      // Mettre à jour
      user.username = data.username
      user.phone_number = data.phone_number
      user.avatar = data.avatar

      await user.save()

      return response.status(200).send({ message: 'Utilisateur mis à jour avec succès' })
    } catch (error) {
      // return error
      return response.status(422).send({ message: error.message })
    }
  }

  public async setFavoris({ request, response }: HttpContextContract): Promise<void> {
    try {
      // validation des champs
      const validations = schema.create({
        id: schema.number(),
        favoris: schema.string({}, [rules.json()]),
      })
      // Validation des données de la requête
      const data = await request.validate({ schema: validations })
      // Récupération de l'utilisateur authentifié
      const user = await Users.findOrFail(data.id)
      // Mettre à jour
      user.favoris = data.favoris
      await user.save()

      return response.status(200).send({ message: 'Favoris mis à jour avec succès' })
    } catch (error) {
      return response.send({ message: 'Erreur lors de la mise à jour des favoris' })
    }
  }

  public async getFavoris({ request, response }: HttpContextContract): Promise<void> {
    try {
      const validations = schema.create({
        id: schema.number(),
      })

      const data = await request.validate({ schema: validations })
      const user = await Users.findOrFail(data.id)
      return response.status(200).send({ favoris: user.favoris })
    } catch (error) {
      return response.status(400).send({ message: 'Erreur lors de la récupération des favoris' })
    }
  }
  // logout function
  public async logout({ auth, response }: HttpContextContract) {
    // TODO: ajouter la révocation du token
    // await auth.use('api').revoke()
    // return {
    //   revoked: true
    // }

    await auth.logout()
    return response.status(200)
  }
}
