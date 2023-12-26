import Hash from '@ioc:Adonis/Core/Hash'
// import { DateTime } from 'luxon'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Role from 'App/Models/Role'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        // idrole: 1,
        email: 'toto@outlook.fr',
        password: await Hash.make('toto'),
        phone_number: '0666666666',
        username: "Toto"
      },
      {
        // idrole: 2,
        email: 'tata@outlook.fr',
        password: await Hash.make('tata'),
        phone_number: '0677777777',
        username: "Tata"
      },
      {
        // idrole: 3,
        email: 'tutu@outlook.fr',
        password: await Hash.make('tutu'),
        phone_number: '0688888888',
        username: "Tutu"
      },
    ])
  }
}
