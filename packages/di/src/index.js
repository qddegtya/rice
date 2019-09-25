const Dep = () => {
  let graph = {}

  const Node = (clz, deps = []) => {
    return {
      clz,
      deps
    }
  }

  return {
    set (k, clz) {
      graph[k] = Node(clz)
    },

    // TODO
    addDep () {},

    get (k) {
      return graph[k].clz
    }
  }
}

const dep = Dep()

export const provide = (namespace = '') => Clz => {
  if (!namespace) throw new Error('[@arice/di]: provide need a namespace.')

  dep.set(namespace, Clz)
  return Clz
}

export const injectFactory = (singleton = false) => (namespace = '', ...args) => {
  if (!namespace) throw new Error('[@arice/di]: inject need a namespace.')

  const Clz = dep.get(namespace)
  return singleton ? Clz : new Clz(...args)
}

export const inject = injectFactory()
inject.singleton = injectFactory(true)
