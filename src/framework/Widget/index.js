import { Component } from 'react'

class Widget extends Component {
  constructor (props) {
    super(props)

    const { _eventBus, _app } = this.props

    this.$eventbus = _eventBus
    this._app = _app
  }

  get $app () {
    return this._app
  }
}

Widget.isRiceWidget = true

export default Widget
