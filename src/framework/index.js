import { core } from 'xajs'
import { root } from './EventBus'
import Widget from './Widget'
import Container from './Container'
import renderSync from './__internal__/renderSync'
import * as DEFAULT_CONFIG from './__internal__/constants'

/**
 * @example
 *
 * const portal = new Framework();
 *
 * await portal.loadUI(UI);
 * await portal.mountWidget(ChooseMenu);
 *
 *
 */
@core.decorators.mixin(root)
class Framework {
  constructor(opt = DEFAULT_CONFIG) {
    this.opt = opt
  }

  loadUI(UI, container, props, ctx = {}) {
    return renderSync(
      <UI
        ctx={ctx}
        framework={this}
        {...props}
      />,
      container
    )
  }

  mountWidget(Widget, container, props, ctx = {}) {
    return renderSync(<Widget ctx={ctx} {...props} />, container)
  }
}

export { Framework, Widget, Container }
