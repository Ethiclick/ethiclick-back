import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  // public static table = 'users';

  @column({ isPrimary: true })
  public id: number

  @column()
  public role: string
  
  @column()
  public mail: string
  
  @column()
  public firstName: string
  
  @column()
  public lastName: string
  
  @column()
  public password: string
  
  @column()
  public token: boolean
  
  @column()
  public phoneNumber: number
  
  @column.date()
  public birthDate: DateTime
  
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
