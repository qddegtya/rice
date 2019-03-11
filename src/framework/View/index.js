import { Component } from 'react'
import { core } from 'xajs'
import createPage from './createPage'
import { lifecycle } from './mixins'

@core.decorators.mixin(lifecycle)
class View extends Component {
  constructor ($app, data = {}) {
    super()

    this.$page = createPage(data, this)
    this.$app = $app
  }

  // TODO: proxy?
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

  get isEliminated () {
    return this.$page.isEliminated
  }

  get isRunning () {
    return this.$page.isRunning
  }
}

View.isRiceView = true

export default View
