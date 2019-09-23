import { Component } from 'react'

class Widget extends Component {
  constructor (props) {
    super(props)

    const { _eventBus, _app, _effectCenter } = this.props

    this.$eventbus = _eventBus
    this.$e = _effectCenter
    this._app = _app
  }

  get $app () {
    return this._app
  }

  // proxy this.$e
  $next (payload) {
    this.$e.$next(payload)
  }

  $error (err) {
    this.$e.$error(err)
  }

  $complete () {
    this.$e.$complete()
  }
}

Widget.isRiceWidget = true

export default Widget
