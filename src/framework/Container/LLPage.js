import { createPage, createLLPageManager } from 'llpage'
import { Component } from 'react'
import { core } from 'xajs'
import { pageLifecycle as defaultPageLifeCycleImplement } from './mixins'

@core.decorators.mixin(defaultPageLifeCycleImplement)
class LLPage extends Component {
  constructor(props) {
    super(props)

    this.ui = this
    this.llpage = createLLPageManager({
      size: this.props.pageKeepAliveNum
    })

    this._patches = []
  }

  patchPageLifeCycle(name, fn) {
    this._patches.push({
      name,
      fn
    })

    return this
  }

  lsPatches() {
    return this._patches
  }

  _applyPageLifeCyclePatch(page) {
    const self = this
    const _hooks = page.hooks

    for (let prop in _hooks) {
      const _oriMethod = _hooks[prop]
      _hooks[prop] = function _patch(...args) {
        // ensure
        _oriMethod.apply(this, args)

        self._patches.forEach(patch => {
          patch.fn.call(this, prop, page)
        })
      }
    }
  }

  get $runningPage() {
    return this.llpage.runningPage
  }

  $open(ctx) {
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

    this._applyPageLifeCyclePatch(_page)
    this.llpage.open(_page)
  }

  $close(page) {
    this.llpage.close(page)
  }

  $closeOthers(page) {
    this.llpage.closeOthers(page)
  }

  $closeAll() {
    this.llpage.closeAll()
  }

  $refresh(page) {
    this.llpage.refresh(page)
  }
}

export default LLPage
