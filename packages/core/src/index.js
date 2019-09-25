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
    }
  }
}

export const connect = ({ effects }) => App => props => {
  const { dispatch } = Eva(createEffects(effects))
  const $provide = singleton => provide(`@component/${App.name}`)(singleton)

  return <App dispatch={dispatch} provide={$provide} {...props} />
}

export default Rice
