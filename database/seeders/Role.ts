import BaseSeeder from '@adonisjs/lucid/seeders'
import Roles from '../../app/Models/Role.js'

export default class RoleSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Roles.createMany([
      {
        libelle: 'admin',
      },
      {
        libelle: 'professionnel',
      },
      {
        libelle: 'client',
      },
    ])
  }
}
