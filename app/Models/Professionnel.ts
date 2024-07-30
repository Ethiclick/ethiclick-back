import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
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
  public nom: string

  @column()
  public siret: string

  @column()
  public adresse: string

  @column()
  public coordinates: string

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
  @column()
  public iduser: number
  @hasOne(() => User, {
    foreignKey: 'id', // id column on "User" model
  })
  public profile: HasOne<typeof User>



  @column()
  public idcat1: number

  @column()
  public idcat2: number

  @column()
  public idcat3: number

  @column()
  public idprice: number

  @column()
  public idabo: number

  // Relations
  @belongsTo(() => CategorieOne, {
    foreignKey: 'idcat1',
  })
  public categorieOne: BelongsTo<typeof CategorieOne>

  @belongsTo(() => CategorieTwo, {
    foreignKey: 'idcat2',
  })
  public categorieTwo: BelongsTo<typeof CategorieTwo>

  @belongsTo(() => CategorieThree, {
    foreignKey: 'idcat3',
  })
  public categorieThree: BelongsTo<typeof CategorieThree>

  @belongsTo(() => PriceRange, {
    foreignKey: 'idprice',
  })
  public price: BelongsTo<typeof PriceRange>

  @belongsTo(() => Abonnement, {
    foreignKey: 'idabo',
  })
  public abo: BelongsTo<typeof Abonnement>
}
