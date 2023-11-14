import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
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

    @belongsTo(() => User)
    public id_user: BelongsTo<typeof User>

    @belongsTo(() => CategorieOne)
    public id_cat1: BelongsTo<typeof CategorieOne>

    @belongsTo(() => CategorieTwo)
    public id_cat2: BelongsTo<typeof CategorieTwo>

    @belongsTo(() => CategorieThree)
    public id_cat3: BelongsTo<typeof CategorieThree>

    @belongsTo(() => PriceRange)
    public id_priceRange: BelongsTo<typeof PriceRange>

    @belongsTo(() => Abonnement)
    public id_abo: BelongsTo<typeof Abonnement>
    // @hasOne(() => User, {
    //   // pour tester lequel sera le nom de la colonne qui contiendra la clé étragnère
    //   // ! namingStrategie Adonis -> snakeCase
    //   serializeAs: 'serializeAs',
    //   localKey: 'localKey',
    //   foreignKey: 'user_pro'
    // })
    // public user: HasOne<typeof User>
}