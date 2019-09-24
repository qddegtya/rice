import message from './message'

const msg = message('@arice/core')

class NotImplementedError extends Error {
  constructor (method) {
    super ()
    this.message = msg(`${method} not implemented, please check it.`)
  }
}

export default NotImplementedError
