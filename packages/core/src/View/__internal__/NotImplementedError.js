class NotImplementedError extends Error {
  constructor (method) {
    super ()
    this.message = `[rice] ${method} not implemented, please check it.`
  }
}

export default NotImplementedError
