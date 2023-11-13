import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'horaires'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      /**
       * Colonne
       */
      table.date('open1')
      table.date('close1')
      table.date('open2')
      table.date('close2')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
