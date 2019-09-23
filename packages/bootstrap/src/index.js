import Rice from '@arice/core'
import { internal } from 'xajs'
import { NOOP } from './constants'

const bootstrap = ({
  framework = {},
  apps = {},
  viewEngine = {},
  plugins = [],
  beforeBootstrap = NOOP,
  afterBootstrap = NOOP
}) => async appName => {
  const rf = new Rice.Framework(framework)
  let bb = beforeBootstrap,
    ab = afterBootstrap

  for (const k in viewEngine) {
    const ve = viewEngine[k]
    if (!ve.isRiceView)
      throw new Error(`viewEngine: ${k} is not a valid rice view engine.`)
    rf.defineView(k, ve)
  }

  if (appName in apps) {
    let currentApp = apps[appName]

    let {
      bundle: bundlePromise,
      mountNode = null,
      props = {},
      sideEffects = NOOP,
      beforeBootstrap = bb,
      afterBootstrap = ab
    } = currentApp

    let getBundle = () => null

    if (internal.is.isFunction(bundlePromise)) {
      getBundle = () => bundlePromise().then(mod => mod.default)
    }

    const app = await getBundle()

    if (!app) {
      throw new Error(`Bundle of [${appName}] load failed, please check.`)
    }

    await beforeBootstrap(rf, currentApp)

    // setup sideEffects
    await sideEffects(rf.$effectCenter.$effect)

    // load app
    await rf.loadApp(app, mountNode, props, plugins)

    await afterBootstrap(rf, currentApp)
  } else {
    throw new Error(`Can not find this app: ${appName}.`)
  }
}

export default bootstrap
