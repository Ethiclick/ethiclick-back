import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import CategorieOne from './CategorieOne'

export default class CategorieTwo extends BaseModel {
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

  // ! Clé étrangère
  @column()
  public idcat1: number
  // id_cat1
  @hasOne(() => CategorieOne, {
    foreignKey: 'id', // id column on "CategorieOne" model
  })
  public profile: HasOne<typeof CategorieOne>


  
}
