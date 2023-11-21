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
Route.get('/users', 'UsersController.add'); //! utilisation du controller

Route.post('/add', async () => {
  const password = await Hash.make("toto")
  const birthDate = DateTime.fromFormat('1990-09-04', 'yyyy-MM-dd')
  
  const user = new User()
  try {
    user
    .fill({
      role: 'admin',
      email: 'toto@outlook.fr',
      first_name: 'toto',
      last_name: 'toto',
      password: password,
      phone_number: '0666666666',
      birthday: birthDate
    }).save();   
  } catch (error) {
    console.log(error)
  }
})


Route.get('/:id', async({ auth }) => {

    const user = await User
    .query()
    .where('id', ':id')
    .firstOrFail()

  try {
    const token = await auth.use('api').generate(user)
    
    return token
  } catch (error) {
    console.log(error)
  }
})
// Authentification

Route.post('login', async ({ auth, request, response }) => {
  const email = request.input('email')
  const password = request.input('password')
   
  try {
    const token = await auth.use('api').attempt(email, password)
    return token
  } catch (error){
    console.error(error.message);
    return response.unauthorized('Invalid credentials')
  }
})

// *** TEST de connexion redis
Route.get('/test-redis', async ({ response }) => {
  try {
    await Redis.ping();
    return response.send('Connected to Redis!');
  } catch (error) {
    return response.status(500).send('Error connecting to Redis.');
  }
});
