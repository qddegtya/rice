import NotImplementedError from '../__internal__/NotImplementedError'

const lifecycle = {
  async onPageCreate(page) {
    throw new NotImplementedError('onPageCreate')
  },

  async onPageStart(page) {
    throw new NotImplementedError('onPageStart')
  },

  async onPagePause(page) {
    throw new NotImplementedError('onPagePause')
  },

  async onPageDestroy(page) {
    throw new NotImplementedError('onPageDestroy')
  },

  async onPageRestart(page) {
    throw new NotImplementedError('onPageRestart')
  },

  async onPageResume(page) {
    throw new NotImplementedError()
  },

  async onPageStop(page) {
    throw new NotImplementedError()
  },

  async onPageRefresh(page, isRunning) {
    throw new NotImplementedError()
  }
}

export default lifecycle
