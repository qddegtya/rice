import LLPage from './LLPage'

class App extends LLPage {
  constructor(props) {
    super(props)
    const { _eventBus } = this.props

    this.$eventbus = _eventBus
  }

  $pageFactory (View) {
    if (!View.isRiceView) throw new Error('View must be Rice.View')
    return (data, ...args) => new View(this, data, ...args)
  }
}

App.isRiceApp = true

export default App
