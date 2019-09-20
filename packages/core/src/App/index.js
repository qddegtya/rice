import LLPage from './LLPage'
import EventBus from '../EventBus'
import renderSync from '../__internal__/renderSync'
import * as DEFAULT_CONFIG from '../__internal__/constants'

class App extends LLPage {
  constructor(props) {
    super(props)
    const { _eventBus, _viewHandlers, _framework, _effectCenter } = this.props

    this.$eventbus = _eventBus
    this.$viewHandlers = _viewHandlers
    this._framework = _framework
    this.$e = _effectCenter
  }

  $next (payload) {
    this.$e.$next(payload)
  }

  $error (err) {
    this.$e.$error(err)
  }

  $complete () {
    this.$e.$complete()
  }

  get $framework () {
    return this._framework
  }

  $pageFactory(View) {
    if (!View.isRiceView) throw new Error('View must be Rice.View')
    return (data, ...args) => new View(this, data, ...args)
  }

  $useView(name) {
    if (!this.$viewHandlers[name]) throw new Error('No such view handler')
    return this.$viewHandlers[name]
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
        _eventBus={new EventBus(DEFAULT_CONFIG.ROOT_CHANNEL_NAME)}
      />,
      container
    )
  }
}

App.isRiceApp = true

export default App
