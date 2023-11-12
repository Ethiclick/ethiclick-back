import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Professionnel extends BaseModel {
  // public static table = 'professionnels';

  @column({ isPrimary: true })
  public id: number

  @column()
  public role: string

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

    // TODO: ajouter les clé étrangère
}
