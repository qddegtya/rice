import { createPage } from 'llpage'

export default (data, page) =>
  createPage({
    data,
    async onCreate() {
      await page.onCreate(page)
    },

    async onStart() {
      await page.onStart(page)
    },

    async onPause() {
      await page.onPause(page)
    },

    async onDestroy() {
      await page.onDestroy(page)
    },

    async onRestart() {
      await page.onRestart(page)
    },

    async onResume() {
      await page.onResume(page)
    },

    async onStop() {
      await page.onStop(page)
    },

    async onRefresh(isRunning) {
      await page.onRefresh(page, isRunning)
    }
  })
