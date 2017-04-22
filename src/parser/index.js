/* eslint-disable no-cond-assign */

const cleanLine = str => String(str).trim().replace(/\s+/, ' ')
const comments = str => !str.match(/^\/\//)
const splitLines = str => str.split(/\n/g).map(cleanLine).filter(comments)

const parseLine = str => {
  const [, num, line] = str.match(/(?:([0-9.]+),)?(.*)/)
  return num ? [Number(num), cleanLine(line)] : [1, line]
}

const matchTemplateHeader = str => str.match(/^;@(?:tpl|plantilla)\|(.*)/)
const matchTableHeader = str => str.match(/^;(.*)/)

export default (str, fromContext) => {
  const context = fromContext ? `${fromContext}.` : ''
  const lines = splitLines(str)
  let match, clean
  let key = 'main'
  let type = 'sources'

  return lines.reduce((sources, line) => {
    // is template
    if (match = matchTemplateHeader(line)) {
      [, key] = match
      key = `${context}${key}`
      type = 'tpls'
      return sources
    }

    // normal table
    if (match = matchTableHeader(line)) {
      [, key] = match
      key = `${context}${key}`
      type = 'sources'
      return sources
    }

    // IS NOT HEADER, ADD LINE
    sources[type][key] = sources[type][key] || []

    if (type === 'sources') {
      clean = parseLine(line)
      if (clean[1]) {
        sources[type][key].push(clean)
      }
    }

    if (type === 'tpls') {
      sources[type][key] += line + '\n'
    }

    return sources
  }, {
    sources: {},
    tpls: {}
  })
}
