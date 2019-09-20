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

  $next (payload) {
    this.$app.$next(payload)
  }

  $error (err) {
    this.$app.$error(err)
  }

  $complete () {
    this.$app.$complete()
  }
}

Widget.isRiceWidget = true

export default Widget
