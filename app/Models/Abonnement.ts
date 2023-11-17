import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Abonnement extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public libelle: string

  @column()
  public totalPrice: string // peut être qu'on aura besoin de + de champs pour faire les paiement en plsr fois?

  @column.date()
  public date_debut: DateTime

  @column.date()
  public date_fin_prevu: DateTime

  @column.date()
  public durée: DateTime

  @column()
  public mode_paiement: string // voir peut être à passer sur une table/ selon la gestion du paiement via l'apps

  @column()
  public actif: boolean

  @column.date()
  public lastPaiement: DateTime

  @column.date()
  public date_fin_effective: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // TODO: clé étrangère
  // iduser
}
