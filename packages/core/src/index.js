import { xajs, renderSync } from '@arice/util'
import Widget from './Widget'
import App from './App'
import EventBus from './EventBus'
import Effect from './Effect'

const { fp } = xajs

/**
 * @example
 *
 * const framework = new Framework({});
 *
 * await framework.loadApp(App);
 *
 *
 */

class Framework {
  constructor(opt = {}) {
    // TODO
    this.opt = opt
    
    this.$eventbus = new EventBus()
    this.$effect = new Effect()
  }

  loadApp(App, container, props, enhancers = []) {
    if (enhancers.length > 0) App = fp.compose.apply(null, enhancers)(App)
    
    return renderSync(
      <App
        {...props}
        _framework={this}
        _effect={this.$effect}
        _eventBus={new EventBus()}
      />,
      container
    )
  }
}

export { Framework, Widget, App }
