import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import CategorieOne from '../../app/Models/CategorieOne'

export default class CategoriesOneSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await CategorieOne.createMany([
      {
        libelle: 'Alimentation',
        color: 'rgba(11, 192, 236, 1)',
      },
      {
        libelle: 'Restaurants, bars, cafés',
        color: 'rgba(30, 225, 83, 1)',
      },
      {
        libelle: 'Bien-être',
        color: 'rgba(249, 219, 103, 1)',
      },
      {
        libelle: 'Finances',
        color: 'rgba(130, 214, 88, 1)',
      },
      {
        libelle: 'Loisirs',
        color: 'rgba(46, 138, 138, 1)',
      },
      {
        libelle: 'Habitat',
        color: 'rgba(40, 215, 214, 1)',
      },
      {
        libelle: 'Mode',
        color: 'rgba(249, 103, 206, 1)',
      },
      {
        libelle: 'Services',
        color: 'rgba(249, 103, 206, 1)',
      },
      // {
      //   libelle: 'Faune & flore',
      //   color: 'rgba(30, 225, 83, 1)',
      // },
      // {
      //   libelle: 'Technologie',
      //   color: 'rgba(132, 49, 190, 1)',
      // },
      // {
      //   libelle: 'Transport',
      //   color: 'rgba(236, 55, 11, 1)',
      // },
      // {
      //   libelle: 'Écolieux',
      //   color: 'rgba(177, 90, 75, 1)',
      // },
      // {
      //   libelle: 'Nettoyage',
      //   color: 'rgba(168, 11, 236, 1)',
      // },
    ])
  }
}
