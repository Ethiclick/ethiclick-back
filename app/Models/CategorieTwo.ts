import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import CategorieOne from './CategorieOne.js'
import CategorieThree from './CategorieThree.js'
import { HasMany } from "@adonisjs/lucid/types/relations";
import { HasOne } from "@adonisjs/lucid/types/relations";

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

  // ! Clé étrangère de categorie 1
  @column()
  public idcat1: number
  @hasOne(() => CategorieOne, {
    foreignKey: 'id', // id column on "CategorieOne" model
  })
  public profile: HasOne<typeof CategorieOne>

  // id de cat2 est la clé étrangère de categorieThree
  @hasMany(() => CategorieThree)
  public categorieId: HasMany<typeof CategorieThree>
}
