import { render } from '@arice/platform-react'
import Eva, { createEffects } from '@arice/eva'

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
  return <App dispatch={dispatch} {...props} />
}

export default Rice
