
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { MyipSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = MyipSDK.test()
    equal(testsdk instanceof MyipSDK, true,
      'MyipSDK.test() must return a client synchronously')
  })

})
