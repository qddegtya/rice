import Rice from '@arice/core'
import { xajs } from '@arice/util'
import { NOOP } from './constants'

const { internal } = xajs

const bootstrap = ({
  framework = {},
  apps = {},
  plugins = [],
  beforeBootstrap = NOOP,
  afterBootstrap = NOOP
}) => async appName => {
  const rf = new Rice.Framework(framework)
  let bb = beforeBootstrap,
    ab = afterBootstrap

  if (appName in apps) {
    let currentApp = apps[appName]

    let {
      bundle: bundlePromise,
      container = null,
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
    await sideEffects(rf.$effect.$effect)

    // load app
    await rf.loadApp(app, container, props, plugins)

    await afterBootstrap(rf, currentApp)
  } else {
    throw new Error(`Can not find this app: ${appName}.`)
  }
}

export default bootstrap
