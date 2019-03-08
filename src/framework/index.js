import Widget from './Widget'
import Container from './Container'
import renderSync from './__internal__/renderSync'
import * as DEFAULT_CONFIG from './__internal__/constants'
import EventBus from './EventBus'

/**
 * @example
 *
 * const framework = new Framework();
 *
 * await framework.loadUI(UI);
 * await framework.mountWidget(SomeWidget);
 *
 *
 */

class Framework {
  constructor(opt = DEFAULT_CONFIG) {
    this.opt = opt
    
    this.$eventbus = new EventBus(
      this.opt.channel || DEFAULT_CONFIG.ROOT_CHANNEL_NAME
    )
  }

  loadUI(UI, container, props, ctx = {}) {
    return renderSync(
      <UI
        ctx={ctx}
        {...props}
        pageKeepAliveNum={this.opt.pageKeepAliveNum}
        _eventbus={this.$eventbus}
      />,
      container
    )
  }

  mountWidget(Widget, container, props, ctx = {}) {
    return renderSync(
      <Widget ctx={ctx} {...props} _eventbus={this.$eventbus} />,
      container
    )
  }
}

export { Framework, Widget, Container }
