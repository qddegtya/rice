const message = (prefix = '') => (msg = '') =>
  `${prefix ? ['[', prefix, ']', ': '].join('') : ''}${msg}`
export default message
