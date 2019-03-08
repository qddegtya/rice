import { Component } from 'react'

class Widget extends Component {
  constructor (props) {
    super(props)

    const { _eventBus } = this.props

    this.$eventbus = _eventBus
  }
}

Widget.isRiceWidget = true

export default Widget
