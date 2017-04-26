/* eslint-disable no-useless-escape,no-cond-assign */

import {rand} from '../../functions'
import {
  getModdedGenerator,
  getFilteredGenerator,
  isDiceRoll,
  makeFilteredRoller
} from '../filters'

export default (data, selectors) => {
  return Object.keys(data.tpls).reduce((obj, tpl) => {
    obj[tpl] = () => {
      let [, context] = (tpl || '').match(contextRE)
      context = context || 'main'
      return execReplacement(data.tpls[tpl], selectors, context)
    }
    return obj
  }, selectors)
}

const contextRE = /(?:([^\.]+)\.)?(.*)/
const generatorRE = /\[(?:([^@\]]+)@)?([^\[\]|]*)(?:\|([^\[\]]*))?\]/gm
const inlineTableRE = /\[(?:([^@\]]+)@)?>(([^;\@\[\]\|]+;*)+)\]/g

const hasMoreSelectors = str => str.match(generatorRE)

const makeInlineGenerator = str => {
  const [, , inline] = inlineTableRE.exec(str)
  const options = inline.split(/;/)
  const size = options.length

  return () => options[rand(0, size - 1)]
}

export const execReplacement = (str, selectors, fromContext, recursive) => {
  const lines = str.split(/\n/)

  return lines.reduce((final, line) => {
    let match
    if (!hasMoreSelectors(line)) {
      return `${final ? `${final}\n` : ''}${line}`
    }

    while (match = generatorRE.exec(line)) {
      let [pattern, mod, fullName, filters] = match
      let [, context, name] = (fullName || '').match(contextRE)
      context = context || fromContext || 'main'
      let inlineGenerator

      if (pattern.match(inlineTableRE)) {
        inlineGenerator = makeInlineGenerator(pattern)
      }

      // only add known generators to the queue
      if (isDiceRoll(name)) {
        let roller = makeFilteredRoller(name, filters)
        line = line.replace(pattern, roller())
      }

      let generator = inlineGenerator || selectors[`${context}.${name}`] || selectors[name]

      if (generator) {
        let moddedFn = getModdedGenerator(mod, generator)
        let parsed = moddedFn()

        if (hasMoreSelectors(parsed)) {
          parsed = execReplacement(parsed, selectors, context, true)
        }
        let filtered = getFilteredGenerator(filters)
        line = line.replace(pattern, filtered(parsed))
      }
    }
    return `${(recursive) ? '' : `${final ? `${final}\n` : ''}`}${line}`
  }, '')
}
