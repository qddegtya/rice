import NotImplementedError from '../__internal__/NotImplementedError'

const lifecycle = {
  async onCreate(page) {
    throw new NotImplementedError('onCreate')
  },

  async onStart(page) {
    throw new NotImplementedError('onStart')
  },

  async onPause(page) {
    throw new NotImplementedError('onPause')
  },

  async onDestroy(page) {
    throw new NotImplementedError('onDestroy')
  },

  async onRestart(page) {
    throw new NotImplementedError('onRestart')
  },

  async onResume(page) {
    throw new NotImplementedError('onResume')
  },

  async onStop(page) {
    throw new NotImplementedError('onStop')
  },

  async onRefresh(page, isRunning) {
    throw new NotImplementedError('onRefresh')
  }
}

export default lifecycle
