import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Horaire extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.date()
  public open1: DateTime

  @column.date()
  public close1: DateTime

  @column.date()
  public open2: DateTime

  @column.date()
  public close2: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // !Clé étrangère
  // id_jour
  // id_pro
}
