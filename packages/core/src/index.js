import Widget from './Widget'
import App from './App'
import View from './View'
import SandBox from './SandBox'
import * as vm from './vm'
import renderSync from './__internal__/renderSync'
import * as DEFAULT_CONFIG from './__internal__/constants'
import EventBus from './EventBus'
import Effect from './Effect'
import { fp } from 'xajs'

/**
 * @example
 *
 * const framework = new Framework();
 *
 * await framework.loadApp(App);
 *
 *
 */

class Framework {
  constructor(opt = DEFAULT_CONFIG) {
    this.opt = opt
    this.$eventbus = new EventBus(DEFAULT_CONFIG.ROOT_CHANNEL_NAME)
    this.$effectCenter = new Effect()
    this.viewHandlers = this.opt.viewHandlers || DEFAULT_CONFIG.viewHandlers
    this.$app = null
    this.appMountNode = null
  }

  defineView(name, handler) {
    // high priority
    this.viewHandlers[name] = handler
  }

  loadApp(App, container, props, enhancers = []) {
    if (this.$app) throw new Error('[Rice] Framework has a ref to a specific app, can not load any more apps.')

    if (enhancers.length > 0) App = fp.compose.apply(null, enhancers)(App)
    this.appMountNode = container

    return renderSync(
      <App
        {...props}
        ref={ins => this.$app = ins}
        _framework={this}
        _effectCenter={this.$effectCenter}
        pageKeepAliveNum={this.opt.pageKeepAliveNum}
        _eventBus={new EventBus(DEFAULT_CONFIG.ROOT_CHANNEL_NAME)}
        _viewHandlers={this.viewHandlers}
      />,
      container
    )
  }
}

export { Framework, Widget, App, View, SandBox, vm }
