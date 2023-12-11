import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CategorieThrees extends BaseSchema {
  protected tableName = 'categorie_threes'

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

      table.integer('idcat2').references('categorie_twos.id')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
