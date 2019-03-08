class EventBus {
  constructor (channel) {
    this.bus = new BroadcastChannel(channel)
  }

  postMessage () {
    
  }
}

export default EventBus
