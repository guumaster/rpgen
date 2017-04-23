import {range, isFunction, isDefined} from '../functions'
import {composeRoll, parser} from './functions'

const DEFAULT_ROLLER = {mod: 0, sign: '+', sides: '', dice: '', take: 0, rolls: []}

const toJSON = obj => () => {
  const {mod, sign, sides, dice, take} = obj
  return {mod, sign, sides, dice, take}
}

const repeatRoll = (times, roller, expand = false) => {
  return range(times).map(() => roller(expand))
}

export const createRoller = (str, {fn, reduced = true, debug = false, repeat} = {}) => {
  const rollerObject = Object.assign({debug}, DEFAULT_ROLLER, parser(str))
  const rollerFn = composeRoll(rollerObject)

  const rollerFunction = (expand) => {
    const doExpand = isDefined(expand) ? expand : !reduced
    const result = rollerFn()

    if (isFunction(fn)) {
      fn(result)
    }
    return doExpand ? result : result.total
  }
  rollerFunction.toJSON = toJSON(rollerObject)

  if (repeat) {
    return (expand) => repeatRoll(repeat, () => rollerFunction(expand))
  }
  return rollerFunction
}
