import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Professionnel from 'App/Models/Professionnel'

export default class ProfessionnelSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Professionnel.createMany([
      {
        nom : "Otsokop",
        adresse: "4 Av. de Lattre de Tassigny",
        siret: "81463818500037",
        city: "Bayonne",
        postal_code: 64100,
        website: "https://www.otsokop.org/",
        acc_card : true,
        photos: '[ {"1": "photos" } ]',
      },
      {
        nom : "Grain de soleil",
        siret: "479 509 762 00023",
        adresse: "34 Rue Arnaud Détroyat",
        city: "Bayonne",
        postal_code: 64100,
        website: "https://magasins.lescomptoirsdelabio.fr/fr/grain-de-soleil-bayonne-105456",
        acc_card : true,
        photos: '[ {"1": "photo1.png" } ]',
      },
      {
        nom: "Brasserie BASA",
        siret: "85332303800010",
        adresse: "74 Rue d'Espagne",
        city: "Bayonne",
        postal_code: 64100,
        website: "https://www.brasserie-basa.com/",
        acc_card :true,
        photos: '[ {"1": "superPhoto.jpg" } ]',
      },
    ])
  }
}
