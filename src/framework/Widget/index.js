import { Component } from 'react'
import { core } from 'xajs'
import { root } from '../EventBus'

@core.decorators.mixin(root)
class Widget extends Component {
  get isWidget() {
    return true
  }
}

export default Widget
