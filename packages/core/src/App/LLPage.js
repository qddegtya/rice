import { createLLPageManager } from 'llpage'
import View from '../View'
import { Component } from 'react'

class LLPage extends Component {
  constructor(props) {
    super(props)

    this.ui = this
    this.llpage = createLLPageManager({
      size: this.props.pageKeepAliveNum
    })
  }

  _ensurePageIns (page) {
    if (!(page instanceof View)) {
      throw new Error('page must be instance of Rice.View.')
    }
  }

  get $runningPage() {
    return this.llpage.runningPage
  }

  $open(page) {
    this._ensurePageIns(page)
    this.llpage.open(page.$page)
  }

  $close(page) {
    this._ensurePageIns(page)
    this.llpage.close(page.$page)
  }

  $closeOthers(page) {
    this._ensurePageIns(page)
    this.llpage.closeOthers(page.$page)
  }

  $closeAll() {
    this.llpage.closeAll()
  }

  $refresh(page) {
    this._ensurePageIns(page)
    this.llpage.refresh(page.$page)
  }
}

export default LLPage
