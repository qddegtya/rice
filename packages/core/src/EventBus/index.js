import nextTick from 'next-tick'

class EventBus {
  constructor (channel) {
    // TODO: BroadcastChannel pollyfill or alternative layer
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

export default EventBus
