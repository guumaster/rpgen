import Generator from './generator_class'

export const createGenerator = (str) => {
  const gen = new Generator()
  gen.addContent(str)
  return gen
}

export const fromHtmlElement = (id) => {
  const el = document.getElementById(id)

  if (!el) throw new Error(`Element with id ${id} not found`)

  const txt = document.createElement('textarea')
  txt.innerHTML = el.innerHTML
  return createGenerator(txt.value)
}
