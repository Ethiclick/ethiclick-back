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
import User from 'App/Models/User';
import Hash from '@ioc:Adonis/Core/Hash'
import { DateTime } from 'luxon';


Route.get('/', async () => {
  return { hello: 'world' }
})

// ** Users
Route.get('/add', 'UsersController.add');

// ** Authentification
// Token d'authentification
Route.get('/token/:id', "UsersController.getToken")
// Login
Route.post('login', 'UsersController.login')


// *** TEST de connexion redis
Route.get('/test-redis', async ({ response }) => {
  try {
    await Redis.ping();
    return response.send('Connected to Redis!');
  } catch (error) {
    return response.status(500).send('Error connecting to Redis.');
  }
});
