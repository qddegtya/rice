import { render } from '@arice/platform-react'
import Eva, { createEffects } from '@arice/eva'
import { provide } from '@arice/di'

const Rice = () => {
  let App = null

  return {
    load(Clz) {
      App = Clz
    },

    async start(selector) {
      await render(<App />, document.querySelector(selector))
    }
  }
}

export const connect = ({ effects }) => Component => props => {
  const { dispatch } = Eva({ effects: createEffects(effects)})
  const $provide = namespace => singleton => provide(`@component/${namespace}`)(singleton)

  return <Component dispatch={dispatch} provide={$provide} {...props} />
}

export default Rice
