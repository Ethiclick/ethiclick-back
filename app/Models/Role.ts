import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Users from '#app/Models/User'
import { HasMany } from "@adonisjs/lucid/types/relations";

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
