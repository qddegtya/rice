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
}

export default Page
