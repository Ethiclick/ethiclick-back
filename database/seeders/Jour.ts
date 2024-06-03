import BaseSeeder from '@adonisjs/lucid/seeders'
import Jours from '../../app/Models/Jour.js'

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
