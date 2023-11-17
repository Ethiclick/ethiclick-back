/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import Redis from '@ioc:Adonis/Addons/Redis'

Redis.subscribe('users:signup', (users: string) => {
  console.log(JSON.parse(users))
})
