/* eslint-disable no-console */
import { composeAll, id, rand, range, sum } from '../functions'

export const take = (x, arr) => arr.slice(0, x)
export const dice = x => () => rand(1, x)
export const sortUp = (a, b) => a - b
export const sortDown = (a, b) => b - a

const DICE_ROLL_REGEX = /(?:(?:(best|worst|mejor|peor|mejores|peores)(?: (\d+))? ),?(?: *(?:of|from|de) )?)?(?:(\d+)?d(\d+))( *(?: *(?:[+-] *\d+))+)*/

export const parser = str => {
  const match = str.match(DICE_ROLL_REGEX)
  let [input, type, take, dice = 1, sides, mod = ''] = match
  take = Number(take) || undefined
  dice = Number(dice)
  sides = Number(sides)
  type = isWorstType(type) ? 'worst' : 'best'
  mod = (mod.match(/(\+ *(\d+)|- *\d+)/g) || [])
    .map((i) => i.replace(/ +/g, ''))
    .reduce((a, b) => Number(a) + Number(b), 0)
  const sign = mod >= 0 ? '+' : '-'
  return { input, type, take, dice, sides, sign, mod }
}

export const composeRoll = obj => composeAll([
  // logger
  logger(obj),
  // modder
  adder(obj),
  // taker
  taker(obj),
  // roller
  roller(obj)
])

const isWorstType = type => ['worst', 'peor', 'peores'].includes(type)

export const logger = info => () => {
  const log = [
    `${info.input}`,
    `rolled [${info.rolls}] => ${sum(info.rolls)}`
  ]
  if (info.taken) log.push(`picked [${info.taken}]  => ${sum(info.taken)}`)
  if (info.mod) log.push(`${info.mod >= 0 ? 'added +' : 'subbed '}${info.mod}`)

  log.push(`total => ${info.total}`)
  info.log = log

  info.debug && console.log(log.join('\n'))

  return info
}

const roller = info => () => {
  info.debug && console.log(`rolling ${info.dice}d${info.sides}`)
  info.rolls = range(Number(info.dice)).map(dice(info.sides))
  info.debug && console.log(`rolled ${info.rolls} => ${sum(info.rolls)}`)

  return info.rolls
}

const taker = info => {
  if (!info.take) return id

  return rolls => {
    info.debug && console.log(`taking ${info.take} ${info.type} from ${rolls}`)
    info.taken = take(info.take, Array.from(rolls).sort(isWorstType(info.type) ? sortUp : sortDown))
    info.debug && console.log(`taken ${info.taken} => ${sum(info.taken)}`)
    return info.taken
  }
}

const adder = info => rolls => {
  info.total = sum(rolls) + info.mod

  if (info.mod) {
    info.debug && console.log(`${info.mod < 0 ? 'sub' : 'add'} ${info.mod} => ${info.total}`)
  }
  info.debug && console.log(`total => ${info.total}`)

  return info
}
