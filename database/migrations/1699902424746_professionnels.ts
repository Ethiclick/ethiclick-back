import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'professionnels'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      /**
       * Colonne
       */
      table.integer('siret')
      table.string('adresse')
      table.string('city')
      table.integer('postalCode', 5)
      table.string('website')
      table.boolean('acc_card')
      table.json('photos')

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
