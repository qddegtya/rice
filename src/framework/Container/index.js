import LLPage from './LLPage'

class Container extends LLPage {
  constructor(props) {
    super(props)
    const { _eventBus } = this.props
    this.$eventbus = _eventBus
  }
}

Container.isRiceContainer = true

export default Container
