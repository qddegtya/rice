const lifecycle = {
  async onPageCreate(page) {},

  async onPageStart(page) {},

  async onPagePause(page) {},

  async onPageDestroy(page) {},

  async onPageRestart(page) {},

  async onPageResume(page) {},

  async onPageStop(page) {},

  async onPageRefresh(page, isRunning) {}
}

export default lifecycle
