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

      if (key in window) {
        if (typeof window[key] === 'function' && !isConstructor(window[key])) {
          return window[key].bind(window)
        }

        return Reflect.get(window, key, window)
      }

      return undefined;
    }
  })
}

export function runInContext(code, context) {
  const fn = createFunction(code)
  return fn.bind(context)(context)
}
