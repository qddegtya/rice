import { render } from 'react-dom'
import { functional } from 'xajs'

const renderSync = functional.helper.promisify(render)

export default renderSync
