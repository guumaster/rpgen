import Generator from './generator/generator_class'
import { createGenerator, fromHtmlElement } from './generator'
import { loadGenerator } from './loader'
import { createRoller } from './roller/complex'

export default {
  generator: {
    Generator,
    create: createGenerator,
    load: loadGenerator,
    fromHtmlElement
  },
  roller: {
    create: createRoller
  }
}
