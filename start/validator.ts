/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import { validator } from '@adonisjs/validator'

validator.rule('json', (value) => {
  try {
    JSON.parse(value)
  } catch (e) {
    console.error('Invalid JSON format:', e.message)
    throw new Error('Invalid JSON format')
  }
})
