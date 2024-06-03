import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeSave,
  belongsTo,
  column,
  hasMany
} from '@adonisjs/lucid/orm'
import Role from '#app/Models/Role'
import hash from '@adonisjs/core/services/hash'
import Professionnel from './Professionnel'
import Client from './Client'
import { BelongsTo } from "@adonisjs/lucid/types/relations";
import { HasMany } from "@adonisjs/lucid/types/relations";

export default class Users extends BaseModel {
  public static readonly connection = 'pg'

  // Clé étrangère
  @belongsTo(() => Role)
  public roles: BelongsTo<typeof Role>

  @column()
  public idrole: number
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public username: string

  @column()
  public password: string

  @column()
  public token: boolean

  @column()
  public phone_number: string

  @column()
  public avatar: string

  @column()
  public favoris: string // json => tableau d'identifiant des professionnels

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Professionnel)
  public iduser: HasMany<typeof Professionnel>

  @hasMany(() => Client)
  public iduserclient: HasMany<typeof Client>

  @beforeSave()
  public static async hashPassword(user: Users) {
    if (user.$dirty.password) {
      user.password = await hash.make(user.password)
    }
  }
}
