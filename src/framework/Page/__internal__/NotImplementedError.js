class NotImplementedError extends Error {
  constructor (method) {
    super ()
    this.message = `[react-llpage] ${method} not implemented, please check it.`
  }
}

export default NotImplementedError
