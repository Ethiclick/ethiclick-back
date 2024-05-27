import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unique()
      /**
       * Colonne
       */
      table.string('email').unique()
      table.string('password')
      table.string('username')
      table.boolean('token')
      table.string('phone_number')
      table.string('avatar')
      table.string('favoris')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      // * Clé étrangère
      table.integer('idrole').unsigned().references('roles.id').onDelete('CASCADE')

      table.index(['id', 'email'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
