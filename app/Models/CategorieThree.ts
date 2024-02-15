import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import CategorieTwo from './CategorieTwo'

export default class CategorieThree extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column()
  public libelle: string

  @column()
  // format rgba
  public color: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // ! Clé étrangère de categorie 2
  @column()
  public idcat2: number
  @hasOne(() => CategorieTwo, {
    foreignKey: 'id', // id column on "CategorieOne" model
  })
  public profile: HasOne<typeof CategorieTwo>
}
