const ROOT_CHANNEL_NAME = 'framework_root_channel'

//  TODO: pollyfill for BroadcastChannel
const rootBc = new BroadcastChannel(ROOT_CHANNEL_NAME)

export {
  rootBc as root
}
