import { test } from '@japa/runner'

test('say test', async () => {
  console.log('test')
})

// test('display welcome page', async ({ client }) => {
//   // const response = await client.get('/')

//   // response.assertStatus(200)
//   // response.assertBodyContains({ hello: 'world' })
//   console.log("test");
// })
