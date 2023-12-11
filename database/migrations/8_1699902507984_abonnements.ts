import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Abonnements extends BaseSchema {
  protected tableName = 'abonnements'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unique()

      table.string('libelle')
      table.string('totalPrice')
      table.date('date_debut')
      table.date('date_fin_prevu')
      table.date('durée')
      table.string('mode_paiement') // voir peut être à passer sur une table/ selon la gestion du paiement via l'apps
      table.boolean('actif')
      table.date('lastPaiement')
      table.date('date_fin_effective')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      // ** Clés étrangères
      table.integer('iduser').references('users.id')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
