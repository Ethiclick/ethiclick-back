/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/
import Route from '@ioc:Adonis/Core/Route'
import Redis from '@ioc:Adonis/Addons/Redis'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

// ** Users
Route.group(() => {
  // registration logic
  Route.post('register', 'UsersController.register').as('register')
  Route.post('login', 'UsersController.login').as('login')
  Route.post('update', 'UsersController.update').as('update')
  Route.post('setFavoris', 'UsersController.setFavoris').as('setFavoris')
  Route.post('getFavoris', 'UsersController.getFavoris').as('getFavoris')
  Route.post('logout', 'UsersController.logout').as('logout')
})

// ** Professionnel
Route.group(()=> {
  // TODO: get by categorie
  Route.get('professionnel/:id', 'ProfessionnelsController.getById')
  Route.post('professionnel/update', 'ProfessionnelsController.update')
  Route.get('professionnel/', 'ProfessionnelsController.get')
})

// ** Categorie
Route.group(() => {
  // Regrouper tout les gets
  // récupérer toutes les catégories
  Route.get('/categorie/getAll', 'CategoriesController.getAll')
  // Get by level
  Route.get('/categorie/:level', 'CategoriesController.getByLevel')
  // get by id
  Route.get('/categorie/:level/:id/', 'CategoriesController.getById')
  // Ajout/update de categorie selon les paramètres envoyé
  Route.post('/categorie/addOrUpdate', 'CategoriesController.add')

})

// *** TEST de connexion redis
Route.get('/test-redis', async ({ response }) => {
  try {
    await Redis.ping()
    return response.send('Connected to Redis!')
  } catch (error) {
    return response.status(500).send('Error connecting to Redis.')
  }
})

// check db connection
Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})
