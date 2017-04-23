/* eslint-disable no-useless-escape,no-cond-assign */

import { isDiceRoll, sumRoller } from '../../roller/simple'
import { range } from '../../functions'

export default (mod, gen) => {
  if (!mod) {
    return gen
  }

  let match

  // [x3@string] repeat xN
  if (match = mod.match(/^x([0-9]+)/)) {
    const list = range(Number(match[1])).map(() => () => gen())
    return () => list.reduce((merged, fn) => `${merged}${fn()} `, '')
  }

  // [3d6@string] repeat diced dX
  if (match = isDiceRoll(mod)) {
    let roller = sumRoller(mod)
    return () => range(roller()).map(() => () => gen()).reduce((merged, fn) => `${merged}${fn()} `, '')
  }

  // [1/3@string] dice probability of appearance
  if (match = mod.match(/^([0-9]+)\/([0-9]+)/)) {
    const [, prob, total] = match

    if (!total) return gen

    let roller = sumRoller(`1d${total}`)
    return () => {
      return roller() <= prob ? gen() : ''
    }
  }

  // [x%@string] % probability of appearance
  if (match = mod.match(/^([0-9]+)%/)) {
    const [, prob] = match

    if (!prob) {
      return ''
    }

    if (prob >= 100) {
      return gen
    }

    let roller = sumRoller('1d100')
    return () => roller() <= prob ? gen() : ''
  }

  return gen
}
