import { createLLPageManager } from 'llpage'
import { message } from '@arice/util'
import View from '../View'
import { DEFAULT_SIZE } from '../constants'

const msg = message('@arice/x-view')

class LLPage {
  constructor({ size = DEFAULT_SIZE }) {
    this.llpage = createLLPageManager({
      size
    })
  }

  _ensurePageIns (page) {
    if (!(page instanceof View)) {
      throw new Error(msg('page must be instance of XView.'))
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

  $pin(page) {
    this._ensurePageIns(page)
    this.llpage.pin(page.$page)
  }

  $unpin(page) {
    this._ensurePageIns(page)
    this.llpage.unpin(page.$page)
  }

  $refresh(page) {
    this._ensurePageIns(page)
    this.llpage.refresh(page.$page)
  }
}

export default LLPage
