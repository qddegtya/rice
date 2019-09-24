import { Subject } from 'rxjs'
import { xajs } from '@arice/util'
import { filter } from 'rxjs/operators'

const { internal } = xajs
const $subject = new Subject()

class Effect {
  $next(payload) {
    $subject.next(payload)
  }

  $error(error) {
    $subject.error(error)
  }

  $complete() {
    $subject.complete()
  }

  $effect($filter) {
    if ($filter && internal.is.isFunction($filter))
      return $subject.pipe(filter($filter))
    return $subject
  }
}

export default Effect
