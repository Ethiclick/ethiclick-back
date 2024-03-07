import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Professionnels extends BaseSchema {
  protected tableName = 'professionnels'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unique()
      /**
       * Colonne
       */
      table.string('nom')
      table.string('siret')
      table.string('adresse')
      table.string('city')
      table.integer('postal_code', 5)
      table.string('website')
      table.boolean('acc_card')
      table.string('photos')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      // ** Clé étrangères
      table.integer('iduser').references('users.id')
      table.integer('idcat1').references('categorie_ones.id')
      table.integer('idcat2').references('categorie_twos.id')
      table.integer('idcat3').references('categorie_threes.id')
      table.integer('idprice').references('price_ranges.id')
      table.integer('idabo').references('abonnements.id')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
