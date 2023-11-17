import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Users extends BaseModel {
  // public static table = 'users';
  public static connection = 'pg'
  
  @column({ isPrimary: true })
  public id: number

  @column()
  public role: string
  
  @column()
  public email: string
  
  @column()
  public first_name: string
  
  @column()
  public last_name: string
  
  @column()
  public password: string
  
  @column()
  public token: boolean
  
  @column()
  public phone_number: string
  
  @column.date()
  public birthday: DateTime
  
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
}
