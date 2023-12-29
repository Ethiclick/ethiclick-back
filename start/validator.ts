/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import { validator } from '@ioc:Adonis/Core/Validator'

validator.rule('json', (value, _, options) => {
  try {
    JSON.parse(value)
  } catch (e) {
    return 'Invalid JSON format'
  }
})
