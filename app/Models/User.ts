import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Role from 'App/Models/Role'

export default class Users extends BaseModel {
  // public static table = 'users';
  public static connection = 'pg'

  @hasOne(() => Role)
  public idrole: HasOne<typeof Role>

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

  // ! AdonisJS utilise la règle de nommage snakeCase pour forcer
  // ! le nom de la colonne on peut le déclarer direct dans le décorateur
  // @column({ columnName: 'user_id', isPrimary: true })
  // public id: number

  // @hasOne(() => Profile)
  // public profile: HasOne<typeof Profile>

  // ! Clé étrangère
  // idrole
}
