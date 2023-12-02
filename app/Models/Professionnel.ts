import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import CategorieOne from './CategorieOne'
import CategorieTwo from './CategorieTwo'
import CategorieThree from './CategorieThree'
import PriceRange from './PriceRange'
import Abonnement from './Abonnement'

export default class Professionnel extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column()
  public siret: number

  @column()
  public adresse: string

  @column()
  public city: string

  @column()
  public postalCode: number

  @column()
  public website: string

  @column()
  public acc_carte: boolean

  @column()
  public photos: string[]

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


    // ** Clé étrangère
    @hasMany(() => User, {
      localKey: 'iduser'
    })
    public id_user: HasMany<typeof User>

    @hasMany(() => CategorieOne, {
      localKey: 'idcat1'
    })
    public id_cat1: HasMany<typeof CategorieOne>

    @hasMany(() => CategorieTwo, {
      localKey: 'idcat2'
    })
    public id_cat2: HasMany<typeof CategorieTwo>

    @hasMany(() => CategorieThree, {
      localKey: 'idcat3'
    })
    public id_cat3: HasMany<typeof CategorieThree>

    @hasMany(() => PriceRange, {
      localKey: 'idprice'
    })
    public id_priceRange: HasMany<typeof PriceRange>

    @hasMany(() => Abonnement, {
      localKey: 'idabo'
    })
    public id_abo: HasMany<typeof Abonnement>
}