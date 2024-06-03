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
import router from '@adonisjs/core/services/router'
import redis from '@adonisjs/redis/services/main'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

router.group(() => {
  // registration logic
  router.post('register', 'UsersController.register').as('register')
  router.post('login', 'UsersController.login').as('login')
  router.get('get', 'UsersController.get').as('get').middleware('auth')
  router.post('update', 'UsersController.update').as('update').middleware('auth')
  router.post('setFavoris', 'UsersController.setFavoris').as('setFavoris').middleware('auth')
  router.post('getFavoris', 'UsersController.getFavoris').as('getFavoris').middleware('auth')
  router.post('logout', 'UsersController.logout').as('logout').middleware('auth')
}).prefix(`/users/`)

router.group(() => {
  router.get(':id', 'ProfessionnelsController.getById')
  router.post('update', 'ProfessionnelsController.update')
  router.get('', 'ProfessionnelsController.get')
  router.get('cat/:idcat/:level?', 'ProfessionnelsController.getByCat')
})
  .prefix(`/professionnel/`)
  .middleware('auth')

router.group(() => {
  // Si pas de params => toutes les catégories
  // Si level => toute les categorie de ce level
  // Si level & id => categorie du level indiqué
  router.get('get/:level?/:id?', 'CategoriesController.get')
  // Récupérer la categorie avec le libelle
  router.get('libelle/:libelle', 'CategoriesController.getByLibelle')
  // Ajout/update de categorie selon les paramètres envoyé
  router.post('addOrUpdate', 'CategoriesController.addOrUpdate')
})
  .prefix('/categorie/')
  .middleware('auth')

// *** TEST de connexion redis
router.get('/test-redis', async ({ response }) => {
  try {
    await redis.ping()
    return response.send('Connected to Redis!')
  } catch (error) {
    return response.status(500).send('Error connecting to Redis.')
  }
})

// check db connection
router.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
}).middleware('auth')
