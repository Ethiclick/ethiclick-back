import { DateTime } from 'luxon'
import { BaseModel, beforeSave, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Role from 'App/Models/Role'
import Hash from '@ioc:Adonis/Core/Hash'

export default class Users extends BaseModel {

  public static readonly connection = 'pg'

  // Clé étrangère
  @belongsTo( () => Role)
  public roles: BelongsTo<typeof Role>
  
  @column()
  public idrole: number
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public username: string

  @column()
  public password: string

  @column()
  public token: boolean

  @column()
  public phone_number: string

  @column()
  public avatar: string

  @column()
  public favoris: string // json => tableau d'identifiant des professionnels

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: Users) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
