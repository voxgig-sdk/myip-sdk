
import { Context } from './Context'


class MyipError extends Error {

  isMyipError = true

  sdk = 'Myip'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  MyipError
}

