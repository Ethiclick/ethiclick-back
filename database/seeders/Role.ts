import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Roles from '../../app/Models/Role'

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
