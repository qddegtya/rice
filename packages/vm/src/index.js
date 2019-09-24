const windowPropertyHash = (() => {
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  document.body.appendChild(iframe)
  const windowPropertyHash = {}
  const loop = target => {
    const prototype = Object.getPrototypeOf(target)
    if (prototype) {
      loop(prototype)
    }
    const names = Object.getOwnPropertyNames(target)
    names.forEach(name => {
      windowPropertyHash[name] = true
    })
  }
  loop(iframe.contentWindow)
  document.body.removeChild(iframe)

  return windowPropertyHash
})()
const isConstructor = fn => !!fn.prototype && !!fn.prototype.constructor.name

const createFunction = code => {
  code = `with(context) { ${code}
}`
  // eslint-disable-next-line
  return new Function("context", code);
}

export class Script {
  constructor(code) {
    this.fn = createFunction(code)
  }

  runInContext(context) {
    return this.fn.bind(context)(context)
  }
}

export function createContext(sandbox) {
  return new Proxy(sandbox, {
    has() {
      return true
    },
    get(target, key, receiver) {
      if (key === Symbol.unscopables) {
        return undefined
      }

      if (key in sandbox) {
        return Reflect.get(target, key, receiver)
      }

      if (key === 'window') {
        return receiver
      }

      if (key in windowPropertyHash) {
        if (typeof window[key] === 'function' && !isConstructor(window[key])) {
          return window[key].bind(window)
        }

        return Reflect.get(window, key, window)
      }

      return Reflect.get(target, key, receiver)
    }
  })
}

export function runInContext(code, context) {
  const fn = createFunction(code)
  return fn.bind(context)(context)
}
