import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from '#app/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        idrole: 1,
        email: 'contact@ethiclick.fr',
        username: 'Admin',
        password: await Hash.make('admin'),
      },
    ])
  }
}
