import { Component } from 'react'

class Widget extends Component {
  constructor (props) {
    super(props)

    const { _eventBus, _app, _effect } = this.props

    this.$eventbus = _eventBus
    this.$effect = _effect
    this._app = _app
  }

  get $app () {
    return this._app
  }

  // proxy this.$e
  $next (payload) {
    this.$effect.$next(payload)
  }

  $error (err) {
    this.$effect.$error(err)
  }

  $complete () {
    this.$effect.$complete()
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.$eventbus.close()
  }
}

Widget.isRiceWidget = true

export default Widget
