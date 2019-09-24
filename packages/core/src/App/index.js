import { renderSync } from '@arice/util'
import { Component } from 'react'
import EventBus from '../EventBus'

class App extends Component {
  constructor(props) {
    super(props)

    const { _eventBus, _framework, _effect } = this.props

    this.$eventbus = _eventBus
    this._framework = _framework
    this.$effect = _effect
  }

  $next (payload) {
    this.$effect.$next(payload)
  }

  $error (err) {
    this.$effect.$error(err)
  }

  $complete () {
    this.$effect.$complete()
  }

  get $framework () {
    return this._framework
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.$eventbus.close()
  }

  $mountWidget(Widget, container, props) {
    return renderSync(
      <Widget
        {...props}
        _app={this}
        _eventBus={new EventBus()}
        _effect={this.$effect}
      />,
      container
    )
  }
}

App.isRiceApp = true

export default App
