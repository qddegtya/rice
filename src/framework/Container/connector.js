import { createPage, createLLPageManager } from 'llpage'
import { internal } from 'xajs'

class Connector {
  constructor (opt) {
    this.ui = opt.ui
    this.llpage = createLLPageManager({
      size: opt.pageKeepAliveNum
    })
    this.plugins = []
  }

  // TODO: conflict
  registerPlugin (name, fn) {
    this.plugins.push({
      name,
      fn
    })

    return this
  }

  lsPlugins () {
    return this.plugins
  }

  applyPlugins (page, plugins) {
    const self = this
    for (let prop in page) {
      if (internal.hasOwnProp(page, prop) && /^on(\w)+/i.test(prop)) {
        const _oriMethod = page[prop]
        page[prop] = function _patch (...args) {
          _oriMethod.apply(this, args)

          plugins.forEach(plugin => {
            plugin.fn.call(this, self)
          })
        }
      }
    }
  }

  get runningPage() {
    return this.llpage.runningPage
  }

  open(ctx) {
    const ui = this.ui
    let _page

    try {
      this.llpage._checkPageIns(ctx)
      _page = ctx
    } catch (error) {
      _page = createPage({
        data: ctx,

        async onCreate() {
          await ui.onPageCreate(this)
        },

        async onStart() {
          await ui.onPageStart(this)
        },

        async onPause() {
          await ui.onPagePause(this)
        },

        async onDestroy() {
          await ui.onPageDestroy(this)
        },

        async onRestart() {
          await ui.onPageRestart(this)
        },

        async onResume() {
          await ui.onPageResume(this)
        },

        async onStop() {
          await ui.onPageStop(this)
        },

        async onRefresh(isRunning) {
          await ui.onPageRefresh(this, isRunning)
        }
      })
    }

    this.applyPlugins(_page, this.plugins)
    this.llpage.open(_page)
  }

  close(page) {
    this.llpage.close(page)
  }

  closeOthers(page) {
    this.llpage.closeOthers(page)
  }

  closeAll() {
    this.llpage.closeAll()
  }

  refresh(page) {
    this.llpage.refresh(page)
  }
}

export default Connector
