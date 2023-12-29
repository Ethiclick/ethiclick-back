import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'

export default class CategorieThree extends BaseModel {
  public static get table() {
    return 'categorieThree'
  }

  @column({ isPrimary: true })
  public id: number

  @column()
  public libelle: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // ! Clé étrangère
  // id_cat2
}
