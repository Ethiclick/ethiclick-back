import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class PriceRanges extends BaseModel {
  // public static table = 'priceRanges';

  @column({ isPrimary: true })
  public id: number

  @column()
  public libelle: string

}
