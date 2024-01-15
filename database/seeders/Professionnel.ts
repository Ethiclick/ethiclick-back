import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Professionnel from 'App/Models/Professionnel'

export default class ProfessionnelSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Professionnel.createMany([
      {
        adresse: "2 rue de toto",
        siret: "87785122427394",
        city: "totoland",
        postal_code: 44000,
        website: "www.meilleursite.com",
        acc_card : false,
        photos: '[ {"toto": "tutu" } ]',
      },
      {
        siret: "12345678910111",
        adresse: "10 chemin du tutu",
        city: "laland",
        postal_code: 66000,
        website: "www.deuxiememeilleursite.com",
        acc_card : true,
        photos: '[ {"1": "/toto.png" } ]',
      },
      {
        siret: "98765432158965",
        adresse: "72 chemin du tata",
        city: "rololans",
        postal_code: 12345,
        website: "www.pireSite.com",
        acc_card :false,
        photos: '[ {"xyz": "/lalaere.svg" } ]',
      },
    ])
  }
}
