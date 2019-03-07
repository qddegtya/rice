import { Component } from 'react'
import { core } from 'xajs'
import Connector from './connector'
import { lifecycle } from './mixins'

@core.decorators.mixin(lifecycle)
class Container extends Component {
  constructor(props) {
    super(props)

    const { framework } = this.props
    const { pageKeepAliveNum } = framework.opt

    this.$po = new Connector({
      ui: this,
      pageKeepAliveNum
    })
  }
}

export default Container
