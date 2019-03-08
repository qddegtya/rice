import { createPage } from 'llpage'

export default (data, page) =>
  createPage({
    data,
    async onCreate() {
      await page.onCreate(this)
    },

    async onStart() {
      await page.onStart(this)
    },

    async onPause() {
      await page.onPause(this)
    },

    async onDestroy() {
      await page.onDestroy(this)
    },

    async onRestart() {
      await page.onRestart(this)
    },

    async onResume() {
      await page.onResume(this)
    },

    async onStop() {
      await page.onStop(this)
    },

    async onRefresh(isRunning) {
      await page.onRefresh(this, isRunning)
    }
  })
