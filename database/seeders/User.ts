import Hash from '@ioc:Adonis/Core/Hash'
import { DateTime } from 'luxon';
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'


export default class UserSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await User.createMany([
      {
        role: 'admin',
        email: 'toto@outlook.fr',
        first_name: 'toto',
        last_name: 'toto',
        password: await Hash.make("toto"),
        phone_number: '0666666666',
        birthday: DateTime.fromFormat('1990-09-04', 'yyyy-MM-dd');
      },
      {
        role: 'admin',
        email: 'tata@outlook.fr',
        first_name: 'tata',
        last_name: 'tata',
        password: await Hash.make("tata"),
        phone_number: '0677777777',
        birthday: DateTime.fromFormat('1900-01-03', 'yyyy-MM-dd')
      }
    ])
  }
}
