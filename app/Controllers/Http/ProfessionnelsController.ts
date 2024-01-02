// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Professionnel from "App/Models/Professionnel";

export default class ProfessionnelsController {
  public async get () {
    const pro = await Professionnel.all();
    return pro
  }

}
