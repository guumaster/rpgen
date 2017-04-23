import Generator from './generator'
import {createRoller} from './roller/complex'

const createGenerator = (str) => {
  const gen = new Generator()
  gen.addContent(str)
  return gen
}

const fromHtmlElement = (id) => {
  const el = document.getElementById(id)

  if (!el) throw new Error(`Element with id ${id} not found`)

  return createGenerator(el.innerHTML)
}

export default {
  generator: {
    create: createGenerator,
    fromHtmlElement
  },
  roller: {
    create: createRoller
  }
}
