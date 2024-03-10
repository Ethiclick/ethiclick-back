import Hash from '@ioc:Adonis/Core/Hash'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        idrole: 1,
        email: 'admin@admin.fr',
        password: 'admin',
        username: 'Admin',
      },
      {
        idrole: 2,
        email: 'pro@pro.fr',
        password: 'pro',
        username: 'Professionnel',
      },
      {
        idrole: 3,
        email: 'client@client.fr',
        password: 'client',
        username: 'Client',
      },
    ])
  }
}
