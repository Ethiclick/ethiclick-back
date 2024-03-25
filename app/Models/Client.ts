import { DateTime } from 'luxon'
import { BaseModel, column , HasOne, hasOne} from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public surname: string

  @column.date()
  public birthday: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // ! Clé étrangère
  @column()
  public iduser: number
  @hasOne(() => User, {
    foreignKey: 'id', // id column on "CategorieOne" model
  })
  public profile: HasOne<typeof User>
}
