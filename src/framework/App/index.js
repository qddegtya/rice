import LLPage from './LLPage'

class App extends LLPage {
  constructor(props) {
    super(props)
    const { _eventBus } = this.props

    this.$eventbus = _eventBus

    // TODO: ensure View
    this.$pageFactory = View => data => new View(data, this)
  }
}

App.isRiceApp = true

export default App
