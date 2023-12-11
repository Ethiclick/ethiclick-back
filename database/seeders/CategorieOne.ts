import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import CategorieOne from '../../app/Models/CategorieOne'

export default class CategoriesOneSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await CategorieOne.createMany([
      {
        libelle: 'Alimentation',
        bg_color: 'rgba(11, 192, 236, 1)',
      },
      {
        libelle: 'Bien-être',
        bg_color: 'rgba(249, 219, 103, 1)',
      },
      {
        libelle: 'Mode',
        bg_color: 'rgba(249, 103, 206, 1)',
      },
      {
        libelle: 'Loisirs',
        bg_color: 'rgba(46, 138, 138, 1)',
      },
      {
        libelle: 'Finances',
        bg_color: 'rgba(130, 214, 88, 1)',
      },
      {
        libelle: 'Faune & flore',
        bg_color: 'rgba(30, 225, 83, 1)',
      },
      {
        libelle: 'Habitat',
        bg_color: 'rgba(40, 215, 214, 1)',
      },
      {
        libelle: 'Technologie',
        bg_color: 'rgba(132, 49, 190, 1)',
      },
      {
        libelle: 'Transport',
        bg_color: 'rgba(236, 55, 11, 1)',
      },
      {
        libelle: 'Écolieux',
        bg_color: 'rgba(177, 90, 75, 1)',
      },
      {
        libelle: 'Nettoyage',
        bg_color: 'rgba(168, 11, 236, 1)',
      },
    ])
  }
}
