/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import redis from '@adonisjs/redis/services/main'

redis.subscribe('users:signup', (users: string) => {
  console.log(JSON.parse(users))
})
