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

const uncapitalize = ([first, ...rest]) => {
  return [ first.toLowerCase(), rest.join('') ].join('')
}

export const provide = alias => Clz => {
  dep.set(alias ? alias : uncapitalize(Clz.name), Clz)
  return Clz
}

export const injectFactory = (singleton = true) => (alias, ...args) => (target, property) => {
  Object.defineProperty(target, property, {
    get () {
      const _name = alias ? alias : property
      const Clz = dep.get(_name)

      return singleton ? new Clz(...args) : Clz
    }
  })
}

export const inject = injectFactory()
inject.singleton = injectFactory(true)
