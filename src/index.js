
import RpGen from './generator'

export const Generator = RpGen

export const create = (str) => {
  const gen = new Generator()
  gen.addContent(str)
  return gen
}

export const merge = (gen, str, context) => {
  gen.addContent(str, context)
  return gen
}

export const fromHtmlElement = (id) => {
  const el = document.getElementById(id)

  if (!el) throw new Error(`Element with id ${id} not found`)

  return create(el.innerHTML)
}
