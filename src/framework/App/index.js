import LLPage from './LLPage'

class App extends LLPage {
  constructor(props) {
    super(props)
    const { _eventBus, _viewHandlers } = this.props

    this.$eventbus = _eventBus
    this.$viewHandlers = _viewHandlers
  }

  $pageFactory(View) {
    if (!View.isRiceView) throw new Error('View must be Rice.View')
    return (data, ...args) => new View(this, data, ...args)
  }

  $useView(name) {
    if (!this.$viewHandlers[name]) throw new Error('No such view handler')
    return this.$viewHandlers[name]
  }
}

App.isRiceApp = true

export default App
