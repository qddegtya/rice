import { xajs } from '@arice/util'
import createPage from './createPage'
import { lifecycle } from './mixins'

const { core } = xajs

@core.decorators.mixin(lifecycle)
class XView {
  constructor (data = {}) {
    this.$page = createPage(data, this)
  }

  get id () {
    return this.$page.id
  }

  get data () {
    return this.$page.data
  }

  get eliminationCount () {
    return this.$page.eliminationCount
  }

  get hasBeenEliminated () {
    return this.$page.hasBeenEliminated
  }

  get hasBeenOpened () {
    return this.$page.hasBeenOpened
  }

  get isDead () {
    return this.$page.isDead
  }

  get isPin () {
    return this.$page.isPin
  }

  get isEliminated () {
    return this.$page.isEliminated
  }

  get isRunning () {
    return this.$page.isRunning
  }
}

View.isXView = true

export default XView
