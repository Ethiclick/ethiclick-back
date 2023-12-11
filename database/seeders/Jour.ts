import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Jours from '../../app/Models/Jour'

export default class JourSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Jours.createMany([
      {
        libelle: 'Lundi',
      },
      {
        libelle: 'Mardi',
      },
      {
        libelle: 'Mercredi',
      },
      {
        libelle: 'Jeudi',
      },
      {
        libelle: 'Vendredi',
      },
      {
        libelle: 'Samedi',
      },
      {
        libelle: 'Dimanche',
      },
    ])
  }
}
