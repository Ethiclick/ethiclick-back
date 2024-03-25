import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Users from 'App/Models/User'

export default class Role extends BaseModel {
  @hasMany(() => Users)
  public userId: HasMany<typeof Users>

  @column({ isPrimary: true })
  public id: number

  @column()
  public libelle: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
