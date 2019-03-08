import { Component } from 'react'
import { core } from 'xajs'
import createPage from './createPage'
import { lifecycle } from './mixins'

@core.decorators.mixin(lifecycle)
class Page extends Component {
  constructor (data, container) {
    super()

    if (!container) {
      throw new Error('page must receive a Rice.Container instance.')
    }

    this.vPage = createPage(data, this)
    this.$container = container
  }

  get id () {
    return this.vPage.id
  }

  get data () {
    return this.vPage.data
  }

  get eliminationCount () {
    return this.vPage.eliminationCount
  }

  get hasBeenEliminated () {
    return this.vPage.hasBeenEliminated
  }

  get hasBeenOpened () {
    return this.vPage.hasBeenOpened
  }

  get isDead () {
    return this.vPage.isDead
  }

  get isEliminated () {
    return this.vPage.isEliminated
  }

  get isRunning () {
    return this.vPage.isRunning
  }
}

export default Page
