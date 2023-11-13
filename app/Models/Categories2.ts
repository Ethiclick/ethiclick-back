import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'

export default class Categories2 extends BaseModel {
  // public static table = 'categories2';

  @column({ isPrimary: true })
  public id: number

  @column()
  public libelle: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // ! Clé étrangère
  // id_cat1
}
