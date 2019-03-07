import { Component } from 'react'
import { core } from 'xajs'
import Connector from './connector'
import Hooks from './hooks'
import { root } from '../EventBus'

@core.decorators.mixin([Hooks.prototype, root])
class Container extends Component {
  constructor(props) {
    super(props)

    const { pageKeepAliveNum } = this.props.framework.opt
    this.$po = new Connector({
      ui: this,
      pageKeepAliveNum
    })
  }
}

export default Container
