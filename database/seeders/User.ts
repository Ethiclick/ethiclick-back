import BaseSeeder from '@adonisjs/lucid/seeders'
import User from '#app/Models/User'
import hash from '@adonisjs/core/services/hash'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        idrole: 1,
        email: 'contact@ethiclick.fr',
        username: 'Admin',
        password: await hash.make('admin'),
      },
    ])
  }
}
