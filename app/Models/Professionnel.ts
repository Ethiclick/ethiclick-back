import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Categories from './Categories'
// import CategorieTwo from './CategorieTwo'
// import CategorieThree from './CategorieThree'
import PriceRange from './PriceRange'
import Abonnement from './Abonnement'

export default class Professionnel extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public siret: string

  @column()
  public adresse: string

  @column()
  public city: string

  @column()
  public postal_code: number

  @column()
  public website: string

  @column()
  public acc_card: boolean

  @column()
  public photos: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // ** Clé étrangère
  @hasMany(() => User, {
    localKey: 'iduser',
  })
  public id_user: HasMany<typeof User>

  @hasMany(() => Categories, {
    localKey: 'id_cat',
  })
  public id_cat: HasMany<typeof Categories>

  // @hasMany(() => CategorieTwo, {
  //   localKey: 'idcat2',
  // })
  // public id_cat2: HasMany<typeof CategorieTwo>

  // @hasMany(() => CategorieThree, {
  //   localKey: 'idcat3',
  // })
  // public id_cat3: HasMany<typeof CategorieThree>

  @hasMany(() => PriceRange, {
    localKey: 'idprice',
  })
  public id_priceRange: HasMany<typeof PriceRange>

  @hasMany(() => Abonnement, {
    localKey: 'idabo',
  })
  public id_abo: HasMany<typeof Abonnement>
}
