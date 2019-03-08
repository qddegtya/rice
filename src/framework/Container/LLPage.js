import { createLLPageManager } from 'llpage'
import Page from '../Page'
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
    if (!(page instanceof Page)) {
      throw new Error('page must be instance of Rice.Page.')
    }
  }

  get $runningPage() {
    return this.llpage.runningPage
  }

  $open(page) {
    this._ensurePageIns(page)
    this.llpage.open(page.vPage)
  }

  $close(page) {
    this._ensurePageIns(page)
    this.llpage.close(page.vPage)
  }

  $closeOthers(page) {
    this._ensurePageIns(page)
    this.llpage.closeOthers(page.vPage)
  }

  $closeAll() {
    this.llpage.closeAll()
  }

  $refresh(page) {
    this._ensurePageIns(page)
    this.llpage.refresh(page.vPage)
  }
}

export default LLPage
