import { render } from '@arice/platform-react'
import Eva, { createEffects } from '@arice/eva'
import { provide } from '@arice/di'

const Rice = () => {
  let $ = document.querySelector
  let $App = null

  return {
    load(App) {
      $App = App
    },

    start(selector) {
      return render($App, $(selector))
    },

    module(name, Clz) {
      provide(`@module/${name}`)(Clz)
    }
  }
}

export const connect = ({ effects }) => Component => props => {
  const { dispatch } = Eva(createEffects(effects))
  const $provide = singleton => provide(`@component/${Component.name}`)(singleton)

  return <Component dispatch={dispatch} provide={$provide} {...props} />
}

export default Rice
