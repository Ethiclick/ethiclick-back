import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import CategorieOne from '../../app/Models/CategorieOne';

export default class CategoriesOneSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await CategorieOne.createMany([
      {
        libelle: 'Alimentation',
      },
      {
        libelle: 'Bien-être',
      },
      {
        libelle: 'Mode'
      },
      {
        libelle: 'Loisirs'
      },
      {
        libelle: 'Finances'
      }
    ])
  }
}
