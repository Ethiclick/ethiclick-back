import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PriceRanges extends BaseSchema {
  protected tableName = 'price_ranges'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unique()

      /**
       * Colonne
       */
      table.string('libelle')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
