
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { MyipSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await MyipSDK.test()
    equal(null !== testsdk, true)
  })

})
