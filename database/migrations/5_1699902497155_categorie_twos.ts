import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CategorieTwos extends BaseSchema {
  protected tableName = 'categorie_twos'

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

      // ** Clé étrangère
      table.integer('idcat1').references('categorie_ones.id')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
