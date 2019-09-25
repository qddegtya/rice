import nextTick from 'next-tick'
import BroadcastChannel from 'broadcast-channel'

const ROOT_CHANNEL_NAME = 'rice:eventbus'

class Bc {
  constructor (channel = ROOT_CHANNEL_NAME) {
    this.bus = new BroadcastChannel(channel)
  }

  postMessage (...args) {
    nextTick(() => {
      this.bus.postMessage.apply(this.bus, args)
    })
  }

  close (...args) {
    return this.bus.close.apply(this.bus, args)
  }

  set onmessage (val) {
    this.bus.onmessage = val
  }

  set onmessageerror (val) {
    this.bus.onmessageerror = val
  }
}

export default Bc
