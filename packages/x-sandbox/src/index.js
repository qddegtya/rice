import { EventEmitter } from 'events'
import { NotImplementedError, message } from '@arice/util'

const msg = message('@arice/x-sandbox')

class SandBox extends EventEmitter {
  constructor(container) {
    super()

    if (!(container instanceof Element)) {
      throw new Error(msg('x-sandbox must receive a valid mount dom node.'))
    }

    this.container = container
  }

  run() {
    throw new NotImplementedError('run')
  }

  pause(payload = {}) {
    this.postMessage({
      cmd: 'onShow',
      payload
    })
  }

  resume(payload = {}) {
    this.postMessage({
      cmd: 'onHide',
      payload
    })
  }

  rerun() {
    throw new NotImplementedError('rerun')
  }

  destroy() {
    throw new NotImplementedError('destroy')
  }

  postMessage() {
    throw new NotImplementedError('postMessage')
  }
}

export default SandBox
