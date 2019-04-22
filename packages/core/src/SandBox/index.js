import { EventEmitter } from 'events'
import NotImplementedError from '../__internal__/NotImplementedError'

class SandBox extends EventEmitter {
  constructor(mountNode) {
    super()

    if (!(mountNode instanceof Element)) {
      throw new Error('sandbox must receive a valid mount node.')
    }

    this.mountNode = mountNode
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
