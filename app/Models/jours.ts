import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Jours extends BaseModel {
  // public static table = 'jours';

  @column({ isPrimary: true })
  public id: number

  @column()
  public libelle: string

}
