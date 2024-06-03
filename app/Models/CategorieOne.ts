import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import CategorieTwo from './CategorieTwo'
import { HasMany } from "@adonisjs/lucid/types/relations";

export default class CategorieOne extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public libelle: string

  @column()
  // Format rgba
  public color: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Id categorieOne est la clé étrangère du champs idcat1 de la table CategorieTwo
  @hasMany(() => CategorieTwo)
  public categorieId: HasMany<typeof CategorieTwo>
}
