import Widget from './Widget'
import App from './App'
import View from './View'
import SandBox from './SandBox'
import * as vm from './vm'
import renderSync from './__internal__/renderSync'
import * as DEFAULT_CONFIG from './__internal__/constants'
import EventBus from './EventBus'
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
    this.viewHandlers = this.opt.viewHandlers || DEFAULT_CONFIG.viewHandlers
  }

  defineView(name, handler) {
    // high priority
    this.viewHandlers[name] = handler
  }

  loadApp(App, container, props, enhancers = []) {
    if (enhancers.length > 0) App = fp.compose.apply(null, enhancers)(App)

    return renderSync(
      <App
        {...props}
        _framework={this}
        pageKeepAliveNum={this.opt.pageKeepAliveNum}
        _eventBus={new EventBus(DEFAULT_CONFIG.ROOT_CHANNEL_NAME)}
        _viewHandlers={this.viewHandlers}
      />,
      container
    )
  }
}

export { Framework, Widget, App, View, SandBox, vm }
