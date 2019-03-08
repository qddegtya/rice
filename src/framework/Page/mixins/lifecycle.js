import NotImplementedError from '../__internal__/NotImplementedError'

const lifecycle = {
  async onCreate(page) {
    throw new NotImplementedError('onPageCreate')
  },

  async onStart(page) {
    throw new NotImplementedError('onPageStart')
  },

  async onPause(page) {
    throw new NotImplementedError('onPagePause')
  },

  async onDestroy(page) {
    throw new NotImplementedError('onPageDestroy')
  },

  async onRestart(page) {
    throw new NotImplementedError('onPageRestart')
  },

  async onResume(page) {
    throw new NotImplementedError()
  },

  async onStop(page) {
    throw new NotImplementedError()
  },

  async onRefresh(page, isRunning) {
    throw new NotImplementedError()
  }
}

export default lifecycle
