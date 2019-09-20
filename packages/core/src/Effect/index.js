import { Subject } from 'rxjs'
import { internal } from 'xajs'
import { filter } from 'rxjs/operators'

class Effect {
  constructor () {
    this.$subject = new Subject()
  }

  $next(payload) {
    this.$subject.next(payload)
  }

  $error(error) {
    this.$subject.error(error)
  }

  $complete() {
    this.$subject.complete()
  }

  $effect($filter) {
    if ($filter && internal.is.isFunction($filter))
      return this.$subject.pipe(filter($filter))
    return this.$subject
  }
}

export default Effect
