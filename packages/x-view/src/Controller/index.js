import { message } from '@arice/util'
import LLPage from './LLPage'
import { DEFAULT_SIZE } from '../constants'

const viewEngineStore = {}
const msg = message('@arice/x-view')

class XViewController extends LLPage {
  constructor ({ size = DEFAULT_SIZE }) {
    super(size)
  }

  createPage(View) {
    if (!View.isXView) throw new Error(msg('View must be XView'))
    return (data, ...args) => new View(this, data, ...args)
  }

  useViewEngine(name) {
    if (!viewEngineStore[name]) throw new Error(msg('No such view engine'))
    return viewEngineStore[name]
  }

  static register (name, engine) {
    // high priority
    viewEngineStore[name] = engine
  }
}

export default XViewController
